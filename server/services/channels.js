const channels = [
  { id: 1, name: 'General', users: [], messages: [] },
  { id: 2, name: 'Channel 1', users: [], messages: [] },
  { id: 3, name: 'Channel 2', users: [], messages: [] },
];

const addUserToChannel = (channel, name) => {
  channels
    .filter((c) => c.name === channel)
    .forEach((c) => {
      c.users.push(name);

      return c;
    });
};

module.exports = { channels, addUserToChannel };
