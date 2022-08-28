import { SERVER_URL } from '../constants/api';
import { useSocket } from '../context/SocketProvider';

export const initiateSocketConnection = (socket, channel, name) => {
  console.log('Connecting to socket');

  socket.on('connect', () => {
    console.log(`User ${name} connected.`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${name} disconnected.`);
  });

  if (socket && channel) socket.emit('channel-join', channel);
};

export const switchChannel = (socket, prevChannel, channel) => {
  if (socket) socket.emit('channel-switch', { prevChannel, channel });
};

export const subscribeToMessages = (socket, callback) => {
  if (!socket) return;

  socket.on('new-message', (data) => {
    callback(null, data);
  });
};

export const sendMessage = (socket, data) => {
  socket.emit('message-send', data);
};

export const fetchChannels = async () => {
  const res = await fetch(`${SERVER_URL}/getChannels`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  const data = await res.json();
  return data.channels;
};

export const fetchChannelMessages = async (channel) => {
  const res = await fetch(`${SERVER_URL}/channels/${channel}/messages`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data.messages;
};
