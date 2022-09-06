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
const {
  initializeChannels,
  getChannels,
  setChannels,
  addUserToChannel,
  removeUserFromChannel,
} = require('./services/channels');
const { addUser, removeUser } = require('./services/users');

const { requireAuth } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const channelsRoutes = require('./routes/channelsRoutes');

const Channel = require('./models/channel');
const User = require('./models/user');

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

io.on('connection', async (socket) => {
  console.log('Initializing channels');
  await initializeChannels();
  console.log('Channels fetched');
  // console.log(channels);

  const { userId } = socket.handshake.query;
  console.log(`${userId} connected`);

  // addUser(name, socket.id);
  // addUserToChannel(channel, userId);

  socket.on('disconnect', () => {
    console.log(`${userId} disconnected`);
    // removeUser(name);
  });

  socket.on('add-channel', async (data) => {
    const { channelName, userId } = data;

    if (!channelName || !userId) return;

    try {
      const user = await User.findById(userId).exec();
      const newChannel = new Channel({
        name: channelName,
        users: [user],
        messages: [],
      });
      await newChannel.save();
      setChannels([
        ...getChannels(),
        {
          _id: newChannel._id,
          name: newChannel.name,
          users: newChannel.users,
        },
      ]);
      io.emit('channels-modified', getChannels());
      console.log('Emitting channels that have been modified.');
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('delete-channel', async (data) => {
    const { channelId, userId } = data;

    if (!channelId || !userId) return;

    try {
      // const user = await User.findById(userId).exec();
      await Channel.deleteOne({ _id: channelId });
      setChannels(getChannels().filter((channel) => channel._id != channelId));
      io.emit('channels-modified', getChannels());
      console.log('Emitting channels that have been modified.');
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('channel-switch', (data) => {
    const { prevChannel, channel } = data;

    if (prevChannel) {
      socket.leave(prevChannel);
      console.log(`${userId} has left channel ${prevChannel}`);
      removeUserFromChannel(prevChannel, userId);
    }
    if (channel) {
      socket.join(channel);
      console.log(`${userId} joined channel ${channel}`);
      addUserToChannel(channel, userId);
    }
  });

  socket.on('message-send', async (data) => {
    console.log(data);
    const { content, channelId, userId } = data;
    try {
      const channel = await Channel.findById(channelId).exec();
      const user = await User.findById(userId).exec();
      channel.messages.push({ content, user: userId });
      await channel.save();
      io.to(channelId).emit('message-receive', { content, user });
      console.log('Emitting message to all clients.');
    } catch (err) {
      console.log(err);
    }
  });
});

mongoose.connection.once('open', () => {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
