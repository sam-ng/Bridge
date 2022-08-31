// TODO: DELETE - For testing purposes only
const channels = [
  {
    id: 1,
    name: 'General',
    users: [],
    messages: [
      { content: 'Hello World', user: 'user1' },
      { content: 'Hello World as well', user: 'user2' },
      { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
      { content: 'Hello World', user: 'user1' },
      { content: 'Hello World as well', user: 'user2' },
      { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
      { content: 'Hello World', user: 'user1' },
      { content: 'Hello World as well', user: 'user2' },
      { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
      { content: 'Hello World', user: 'user1' },
      { content: 'Hello World as well', user: 'user2' },
      { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
      { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
      { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
      { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
      { content: 'omg is the server working', user: 'user1' },
    ],
  },
  { id: 2, name: 'Channel 1', users: [], messages: [] },
  { id: 3, name: 'Channel 2', users: [], messages: [] },
];

const addUserToChannel = (channelId, name) => {
  channels
    .filter((c) => c.id === channelId)
    .forEach((c) => {
      c.users.push(name);

      return c;
    });
};

// TODO: rewrite logic and schema eventually
const getChannelMessages = (channelId) => {
  return channels.filter((c) => c.id === parseInt(channelId))[0].messages;
};

module.exports = { channels, addUserToChannel, getChannelMessages };
