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
    // origin: `${process.env.SCHEME}${process.env.IP}:${process.env.CLIENT_PORT}`,
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
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
