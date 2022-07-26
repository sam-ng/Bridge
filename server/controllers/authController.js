const jwt = require('jsonwebtoken');

const User = require('../models/user');

const maxAge = 3 * 24 * 60 * 60;

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

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports = { createToken, signup };
