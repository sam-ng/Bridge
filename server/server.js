require('dotenv').config();
const express = require('express');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
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

connectDB().then((err) => {
  if (err) throw err;

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

  app.get('/', (req, res) => {
    res.send('hello');
  });

  app.get('/protected', requireAuth, (req, res) => {
    res.send('Access protected.');
  });

  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,
  //     saveUninitialized: true,
  //     resave: false,
  //     cookie: { httpOnly: true, maxAge: parseInt(process.env.SESSION_MAX_AGE) },
  //   })
  // );
  app.use('/auth', authRoutes);

  // app.post('/signup', async (req, res) => {
  //   const { username, password } = req.body;

  //   try {
  //     const user = await User.create({username})
  //     const token = createToken(user._id)
  //     res.cookie('access_token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production'})
  //     res.status(200).json(`User ${user._id} created.`)
  //   }

  //   if (!username || !password) {
  //     throw new Error('Missing username or password.');
  //   }

  //   const token = jwt.sign(username, process.env.TOKEN_SECRET);
  //   res.cookie({ token: token });
  // });

  // app.post('/login', async (req, res) => {
  //   const { username, password } = req.body;

  //   try {
  //     const user = await User.create({use})
  //   }

  //   if (!username || !password) {
  //     throw new Error('Missing username or password.');
  //   }

  //   const token = jwt.sign(username, process.env.TOKEN_SECRET);
  //   res.cookie({ token: token });
  // });

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

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  // app.listen(8000, () => {
  //   console.log(`Server listening on port ${PORT}`);
  // });
});
