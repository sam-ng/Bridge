require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const http = require('http');
const { isObject } = require('util');

const { Server } = require('socket.io');

const { connectDB } = require('./configs/db');

const { addMessage } = require('./services/messages');
const { channels, addUserToChannel } = require('./services/channels');
const { addUser, removeUser } = require('./services/users');

const { requireAuth } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const channelsRoutes = require('./routes/channelsRoutes');

const corsOptions = {
  origin: `${process.env.SCHEME}${process.env.DOMAIN}:${process.env.CLIENT_PORT}`,
  credentials: true,
};

connectDB();

const app = express();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// Public Routes
app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/auth', authRoutes);

// Private Routes
// app.use(requireAuth);
app.get('/protected', (req, res) => {
  res.send('Access protected.');
});

app.use('/channels', channelsRoutes);

const server = http.createServer(app);

const io = new Server(server, { cors: corsOptions });

io.on('connection', (socket) => {
  const { name, channel } = socket.handshake.query;
  console.log(`${name} connected`);
  socket.join(channel);
  addUser(name, socket.id);
  addUserToChannel(channel, name);

  socket.on('disconnect', () => {
    console.log(`${name} disconnected`);
    removeUser(name);
  });

  socket.on('channel-switch', (data) => {
    const { prevChannel, nextChannel } = data;
    if (prevChannel) {
      socket.leave(prevChannel);
    }
    if (nextChannel) {
      socket.join(nextChannel);
    }
  });

  socket.on('message-send', (data) => {
    addMessage(data);
    const { channel } = data;
    socket.broadcast.to(channel).emit('new-message', data);
  });
});

mongoose.connection.once('open', () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// app.listen(8000, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
