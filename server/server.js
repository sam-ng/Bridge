const express = require('express');
const app = express();
const http = require('http');
const { isObject } = require('util');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

require('dotenv').config();

const PORT = process.env.PORT;

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
