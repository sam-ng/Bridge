require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const accessMaxAge = 30; // 30 seconds
const refreshMaxAge = 3 * 24 * 60 * 60; // 3 days

const handleAuthErrors = (err) => {
  let errors = { username: '', password: '', email: '' };

  // Duplicate email error
  if (err.code === 11000) {
    errors.email = 'Email is already registered.';
    return errors;
  }

  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessMaxAge,
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshMaxAge,
  });
};

const signup = async (req, res) => {
  const { username, password, email } = req.body;

  const duplicate = await User.findOne({ email }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    const accessToken = createAccessToken({ username });
    const refreshToken = createRefreshToken({ username });
    const user = await User.create({ username, password, email, refreshToken });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: refreshMaxAge * 1000,
    });
    res.status(201).json({ message: `User ${username} was created.` });
  } catch (err) {
    console.log(err);
    const errors = handleAuthErrors(err);
    res.status(500).json(errors);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username or password is missing.' });

  try {
    const user = await User.findOne({ username }).exec();
    if (!user) return res.sendStatus(401);

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = createAccessToken({ username: user.username });
      const refreshToken = createRefreshToken({ username: user.username });

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: refreshMaxAge * 1000,
      });
      res.status(200).json(accessToken);
    }
  } catch (err) {
    console.log(err);
    const errors = handleAuthErrors(err);
    res.status(400).json(errors);
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (user) {
    user.refreshToken = '';
    await user.save();
  }

  res.clearCookie('jwt', { httpOnly: true });
  res.sendStatus(204);
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken }).exec();
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.username !== decoded.username) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessMaxAge }
    );
    res.status(200).json({ accessToken });
  });
};

module.exports = { signup, login, logout, refreshToken };
