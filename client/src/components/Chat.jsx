import { useEffect, useState } from 'react';

import { SERVER_URL } from '../constants/api';

import ChatHeader from './ChatHeader';
import Channels from './Channels';
import ChatBody from './ChatBody';
import ChatInputForm from './ChatInputForm';

import { useSocket } from '../context/SocketProvider';
import useFetch from '../hooks/useFetch';

import { subscribeToMessages } from '../services/socket';

const Chat = ({ channelId, userId }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);

  const { data, isLoading, error, setUrl } = useFetch(
    `${SERVER_URL}/channels/${channelId}/messages`,
    {
      credentials: 'include',
    }
  );

  useEffect(() => {
    setUrl(`${SERVER_URL}/channels/${channelId}/messages`);
  }, [channelId]);

  useEffect(() => {
    if (data) setMessages(data.messages);
    else setMessages([]);
  }, [data]);

  useEffect(() => {
    if (socket.connected)
      subscribeToMessages(socket, (err, data) => {
        setMessages((messages) => [...messages, data]);
      });
  }, [socket, socket.connected]);

  return (
    <section className='grid grid-rows-18 h-full'>
      <ChatHeader channelName={channelId} />
      {isLoading ? <div>Loading...</div> : <ChatBody messages={messages} />}
      <ChatInputForm
        channelId={channelId}
        userId={userId}
        setMessages={setMessages}
      />
    </section>
  );
};

export default Chat;
