const Channel = require('../models/channel');
const User = require('../models/user');

const {
  getChannels,
  setChannels,
  addUserToChannel,
  removeUserFromChannel,
} = require('../services/channels');

module.exports = (io, socket) => {
  const { userId } = socket.handshake.query;
  console.log(`${userId} connected`);

  socket.on('disconnect', () => {
    console.log(`${userId} disconnected`);
    // removeUser(name);
  });

  socket.on('add-channel', async (data) => {
    const { channelName, userId } = data;

    if (!channelName || !userId) return;

    try {
      const user = await User.findById(userId).exec();
      const newChannel = new Channel({
        name: channelName,
        users: [user],
        messages: [],
      });
      await newChannel.save();
      setChannels([
        ...getChannels(),
        {
          _id: newChannel._id,
          name: newChannel.name,
          users: newChannel.users,
        },
      ]);
      io.emit('channels-modified', getChannels());
      console.log('Emitting channels that have been modified.');
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('delete-channel', async (data) => {
    const { channelId, userId } = data;

    if (!channelId || !userId) return;

    try {
      // const user = await User.findById(userId).exec();
      await Channel.deleteOne({ _id: channelId });
      setChannels(getChannels().filter((channel) => channel._id != channelId));
      io.emit('channels-modified', getChannels());
      console.log('Emitting channels that have been modified.');
    } catch (err) {
      console.log(err);
    }
  });

  socket.on('channel-switch', (data) => {
    const { prevChannel, channel } = data;

    if (prevChannel) {
      socket.leave(prevChannel);
      console.log(`${userId} has left channel ${prevChannel}`);
      removeUserFromChannel(prevChannel, userId);
    }
    if (channel) {
      socket.join(channel);
      console.log(`${userId} joined channel ${channel}`);
      addUserToChannel(channel, userId);
    }
  });

  socket.on('message-send', async (data) => {
    console.log(data);
    const { content, channelId, userId } = data;
    try {
      const channel = await Channel.findById(channelId).exec();
      const user = await User.findById(userId).exec();
      channel.messages.push({ content, user: userId });
      await channel.save();
      io.to(channelId).emit('message-receive', { content, user });
      console.log('Emitting message to all clients.');
    } catch (err) {
      console.log(err);
    }
  });
};
