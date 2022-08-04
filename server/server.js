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

const { addMessage, getChannelMessages } = require('./globals/messages');
const { channels, addUserToChannel } = require('./globals/channels');
const { addUser, removeUser } = require('./globals/users');

const { requireAuth } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// const io = new Server(server, {
//   cors: {
//     origin: `${process.env.SCHEME}${process.env.DOMAIN}:${process.env.CLIENT_PORT}`,
//     methods: ['GET', 'POST'],
//   },
// });

const PORT = process.env.PORT || 8000;

// Public Routes
app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/auth', authRoutes);

// Private Routes
app.use(requireAuth);
app.get('/protected', (req, res) => {
  res.send('Access protected.');
});

// app.get('/channels/:channel/messages', (req, res) => {
//   const messages = getChannelMessages(req.params.channel);

//   return res.json({ messages });
// });

// app.get('/channels', (req, res) => {
//   return res.json({ channels });
// });

// io.on('connection', (socket) => {
//   const { name, channel } = socket.handshake.query;
//   console.log('user connected');
//   socket.join(channel);
//   addUser(name, socket.id);
//   addUserToChannel(channel, name);

//   socket.on('channel switch', (data) => {
//     const { prevChannel, nextChannel } = data;
//     if (prevChannel) {
//       socket.leave(prevChannel);
//     }
//     if (nextChannel) {
//       socket.join(nextChannel);
//     }
//   });

//   socket.on('message send', (data) => {
//     addMessage(data);
//     const { channel } = data;
//     socket.broadcast.to(channel).emit('new message', data);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//     removeUser(name);
//   });
// });

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// app.listen(8000, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
