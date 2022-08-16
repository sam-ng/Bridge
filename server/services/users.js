const users = {};

const addUser = (name, socketID) => {
  users[name] = socketID;
};

const removeUser = (name) => {
  if (name in users) delete users[name];
};

module.exports = { users, addUser, removeUser };
