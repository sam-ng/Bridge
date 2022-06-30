const channels = [
  { id: 1, name: 'general', users: [] },
  { id: 2, name: 'channel 2', users: [] },
  { id: 3, name: 'channel 3', users: [] },
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
