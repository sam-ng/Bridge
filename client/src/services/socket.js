export const initiateSocketConnection = (socket, userId, setChannelId) => {
  console.log(`User ${userId} connected.`);

  socket.on('connect', () => {
    console.log(`User ${userId} connected.`);
    setChannelId('631039be75999e8689b6d55c');
  });

  socket.on('disconnect', () => {
    console.log(`User ${userId} disconnected.`);
  });
};

export const addChannel = (socket, channelName, userId) => {
  if (!socket.connected) return;
  socket.emit('add-channel', { channelName, userId });
};

export const deleteChannel = (socket, channelId, userId) => {
  if (!socket.connected) return;
  socket.emit('delete-channel', { channelId, userId });
};

export const switchChannel = (socket, prevChannel, channel) => {
  if (!socket.connected) return;
  socket.emit('channel-switch', { prevChannel, channel });
};

export const sendMessage = (socket, data, setMessages) => {
  if (!socket.connected) return;
  console.log('sending message');
  socket.emit('message-send', data, () => setMessages(data));
};

export const subscribeToChannels = (socket, callback) => {
  socket.on('channels-modified', (data) => {
    callback(data);
  });
};

export const subscribeToMessages = (socket, callback) => {
  socket.on('message-receive', (data) => {
    callback(null, data);
  });
};
