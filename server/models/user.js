const mongoose = require('mongoose');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: [true, 'Please enter an username.'] },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
    minlength: [6, 'Minimum password length is 6 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email.'],
  },
  refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
