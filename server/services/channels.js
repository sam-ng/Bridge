const Channel = require('../models/channel');
// TODO: DELETE - For testing purposes only
// const channels = [
//   {
//     id: 1,
//     name: 'General',
//     users: [],
//     messages: [
//       { content: 'Hello World', user: 'user1' },
//       { content: 'Hello World as well', user: 'user2' },
//       { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
//       { content: 'Hello World', user: 'user1' },
//       { content: 'Hello World as well', user: 'user2' },
//       { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
//       { content: 'Hello World', user: 'user1' },
//       { content: 'Hello World as well', user: 'user2' },
//       { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
//       { content: 'Hello World', user: 'user1' },
//       { content: 'Hello World as well', user: 'user2' },
//       { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
//       { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
//       { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
//       { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
//       { content: 'omg is the server working', user: 'user1' },
//     ],
//   },
//   { id: 2, name: 'Channel 1', users: [], messages: [] },
//   { id: 3, name: 'Channel 2', users: [], messages: [] },
// ];
let channels = [];

const initializeChannels = async () => {
  const channelDocs = await Channel.find().exec();
  channels = channelDocs.map(({ _id, name }) => ({ _id, name, users: [] }));
  return channels;
};

const getChannels = () => {
  return channels;
};

const setChannels = (newChannels) => {
  channels = newChannels;
  return channels;
};

const addUserToChannel = (channelId, name) => {
  channels.filter((c) => c.id === channelId).users?.push(name);
};

const removeUserFromChannel = (channelId, name) => {
  const channelUsers = channels.filter((c) => c.id === channelId).users;
  if (!channelUsers) return;
  const userIndex = channelUsers.indexOf(name);
  channelUsers.splice(userIndex, 1);
};

// TODO: rewrite logic and schema eventually
const getChannelMessages = (channelId) => {
  return channels.filter((c) => c.id === parseInt(channelId))[0].messages;
};

module.exports = {
  initializeChannels,
  getChannels,
  setChannels,
  addUserToChannel,
  removeUserFromChannel,
  getChannelMessages,
};
