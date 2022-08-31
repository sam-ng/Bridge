import { useEffect, useState } from 'react';

import { SERVER_URL } from '../constants/api';

import ChatHeader from './ChatHeader';
import Channels from './Channels';
import ChatBody from './ChatBody';
import ChatInputForm from './ChatInputForm';

import { useSocket } from '../context/SocketProvider';
import useFetch from '../hooks/useFetch';

import {
  initiateSocketConnection,
  switchChannel,
  fetchChannels,
  fetchChannelMessages,
  sendMessage,
  subscribeToMessages,
} from '../services/socket';

const Chat = ({ channelId, name }) => {
  const socket = useSocket();

  const { data, isLoading, error } = useFetch(
    `${SERVER_URL}/channels/${channelId}/messages`,
    {
      credentials: 'include',
    }
  );

  useEffect(() => {});
  console.log(data);

  const [messagesLoading, setMessagesLoading] = useState(true);
  const [channelsLoading, setChannelsLoading] = useState(true);

  return (
    <section className='grid grid-rows-18 h-full'>
      <ChatHeader name={channelId} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ChatBody messages={data?.messages} />
      )}
      <ChatInputForm />

      {/* <Channels
        name={name}
        channelsLoading={channelsLoading}
        channels={channels}
        channel={channel}
        setChannel={setChannel}
      />
      <ChatScreen
        channel={channel}
        messagesLoading={messagesLoading}
        messages={messages}
        message={message}
        handleMessageSend={handleMessageSend}
        handleMessageChange={handleMessageChange}
      /> */}
    </section>
  );
};

export default Chat;
