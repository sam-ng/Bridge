require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { isObject } = require('util');

const { Server } = require('socket.io');

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

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
