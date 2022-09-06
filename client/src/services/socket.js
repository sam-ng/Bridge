import { SERVER_URL } from '../constants/api';

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

export const deleteChannel = (socket, channelName, userId) => {
  if (!socket.connected) return;
  socket.emit('delete-channel', { channelName, userId });
};

export const switchChannel = (socket, prevChannel, channel) => {
  if (!socket.connected) return;
  socket.emit('channel-switch', { prevChannel, channel });
};

export const sendMessage = (socket, data, setMessages) => {
  if (!socket.connected) return;
  socket.emit('message-send', data, () => setMessages(data));
};

export const subscribeToChannels = (socket, callback) => {
  socket.on('channels-modified', (data) => {
    console.log('channels modified');
    console.log(data);
    callback(data);
  });
};

export const subscribeToMessages = (socket, callback) => {
  socket.on('message-receive', (data) => {
    callback(null, data);
  });
};

// export const fetchChannels = async () => {
//   const res = await fetch(`${SERVER_URL}/channels`, {
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//   });
//   const data = await res.json();
//   return data.channels;
// };

// export const fetchChannelMessages = async (channel) => {
//   const res = await fetch(`${SERVER_URL}/channels/${channel}/messages`, {
//     credentials: 'include',
//   });
//   const data = await res.json();
//   return data.messages;
// };
