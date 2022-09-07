require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const http = require('http');
const { isObject } = require('util');

const { Server } = require('socket.io');
const registerHandlers = require('./services/socket');

const { connectDB } = require('./configs/db');
const corsOptions = require('./configs/corsOptions');

const { initializeChannels } = require('./services/channels');

const { requireAuth } = require('./middleware/authMiddleware');

const authRoutes = require('./routes/authRoutes');
const channelsRoutes = require('./routes/channelsRoutes');

// const corsOptions = {
//   origin: `${process.env.SCHEME}${process.env.DOMAIN}:${process.env.CLIENT_PORT}`,
//   credentials: true,
// };

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

const onConnection = (socket) => {
  registerHandlers(io, socket);
};

mongoose.connection.once('open', () => {
  server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);

    await initializeChannels();
    console.log('Channels initialized');

    io.on('connection', onConnection);
  });
});
