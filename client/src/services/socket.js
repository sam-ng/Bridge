import { io } from 'socket.io-client';
import { SERVER_URL } from '../constants/api';
import { useSocket } from '../context/SocketProvider';

export const initiateSocketConnection = (channel, name) => {
  const socket = useSocket();
  socket = io(SERVER_URL, { query: { channel, name } });

  console.log('Connecting to socket');

  socket.on('connect', () => {
    console.log(`User ${name} connected.`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${name} disconnected.`);
  });

  if (socket && channel) socket.emit('channel-join', channel);
};

export const switchChannel = (prevChannel, channel) => {
  const socket = useSocket();
  if (socket) socket.emit('channel-switch', { prevChannel, channel });
};

export const subscribeToMessages = (callback) => {
  const socket = useSocket();
  if (!socket) return;

  socket.on('new-message', (data) => {
    callback(null, data);
  });
};

export const sendMessage = (data) => {
  const socket = useSocket();
  socket.emit('message-send', data);
};

export const fetchChannels = async () => {
  const res = await fetch(`${SERVER_URL}/getChannels`);
  const data = await res.json();
  return data.channels;
};

export const fetchChannelMessages = async (channel) => {
  const res = await fetch(`${SERVER_URL}/channels/${channel}/messages`);
  const data = await res.json();
  return data.messages;
};
