require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { isObject } = require('util');

const { Server } = require('socket.io');

const { addMessage, getChannelMessages } = require('./globals/messages');
const { channels, addUserToChannel } = require('./globals/channels');
const { addUser, removeUser } = require('./globals/users');

const app = express();
app.use(cors);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${process.env.SCHEME}${process.env.DOMAIN}:${process.env.CLIENT_PORT}`,
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/channels/:channel/messages', (req, res) => {
  const messages = getChannelMessages(req.params.channel);

  return res.json({ messages });
});

app.get('/channels', (req, res) => {
  return res.json({ channels });
});

io.on('connection', (socket) => {
  const { name, channel } = socket.handshake.query;
  console.log('user connected');
  socket.join(channel);
  addUser(name, socket.id);
  addUserToChannel(channel, name);

  socket.on('channel switch', (data) => {
    const { prevChannel, nextChannel } = data;
    if (prevChannel) {
      socket.leave(prevChannel);
    }
    if (nextChannel) {
      socket.join(nextChannel);
    }
  });

  socket.on('message send', (data) => {
    addMessage(data);
    const { channel } = data;
    socket.broadcast.to(channel).emit('new message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    removeUser(name);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
