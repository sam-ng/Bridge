import { SERVER_URL } from '../constants/api';

export const initiateSocketConnection = (socket, name) => {
  console.log('Connecting to socket');

  socket.on('connect', () => {
    console.log(`User ${name} connected.`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${name} disconnected.`);
  });
};

export const switchChannel = (socket, prevChannel, channel) => {
  socket.emit('channel-switch', { prevChannel, channel });
};

export const subscribeToMessages = (socket, callback) => {
  socket.on('new-message', (data) => {
    callback(null, data);
  });
};

export const sendMessage = (socket, data) => {
  socket.emit('message-send', data);
};

// export const fetchChannels = async () => {
//   const res = await fetch(`${SERVER_URL}/channels`, {
//     headers: { 'Content-Type': 'application/json' },
//     credentials: 'include',
//   });
//   const data = await res.json();
//   return data.channels;
// };

export const fetchChannelMessages = async (channel) => {
  const res = await fetch(`${SERVER_URL}/channels/${channel}/messages`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data.messages;
};
