require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const accessMaxAge = 5 * 60; // 5 minutes
const refreshMaxAge = 3 * 24 * 60 * 60; // 3 days

const handleErrors = (err) => {
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

const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessMaxAge,
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshMaxAge,
  });
};

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    const accessToken = createAccessToken({ username: user.username });
    const refreshToken = createRefreshToken({ username: user.username });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: refreshMaxAge * 1000,
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username or password is missing.' });
  try {
    const user = await User.find({ username });
    if (!user) return res.sendStatus(401);

    console.log(user);

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = createAccessToken({ username: user.username });
      const refreshToken = createRefreshToken({ username: user.username });
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: refreshMaxAge * 1000,
      });
      res.status(200).json(accessToken);
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = { signup, login };
