const User = require('../models/user');

const addUser = (name, socketID) => {
  users[name] = socketID;
};

const removeUser = (name) => {
  if (name in users) delete users[name];
};

module.exports = { addUser, removeUser };
