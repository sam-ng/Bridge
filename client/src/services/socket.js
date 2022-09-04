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

export const switchChannel = (socket, prevChannel, channel) => {
  if (!socket.connected) return;
  socket.emit('channel-switch', { prevChannel, channel });
};

export const sendMessage = (socket, data, setMessages) => {
  if (!socket.connected) return;
  socket.emit('message-send', data, () => setMessages(data));
};

export const subscribeToMessages = (socket, callback) => {
  if (!socket.connected) return;
  socket.on('message-receive', (data) => {
    console.log('message received');
    console.log(data);
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
