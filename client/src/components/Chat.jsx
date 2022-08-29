import { useEffect, useState } from 'react';

import ChatHeader from './ChatHeader';
import Channels from './Channels';
import ChatBody from './ChatBody';
import ChatInputForm from './ChatInputForm';

import {
  initiateSocketConnection,
  switchChannel,
  fetchChannels,
  fetchChannelMessages,
  sendMessage,
  subscribeToMessages,
} from '../services/socket';

const Chat = ({ channel, name }) => {
  const [messages, setMessages] = useState([
    { content: 'Hello World', user: 'user1' },
    { content: 'Hello World as well', user: 'user2' },
    { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
    { content: 'Hello World', user: 'user1' },
    { content: 'Hello World as well', user: 'user2' },
    { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
    { content: 'Hello World', user: 'user1' },
    { content: 'Hello World as well', user: 'user2' },
    { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
    { content: 'Hello World', user: 'user1' },
    { content: 'Hello World as well', user: 'user2' },
    { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
    { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
    { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
    { content: 'paoijfepoaijf oie fpaief pafe', user: 'user2' },
  ]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [channelsLoading, setChannelsLoading] = useState(true);

  return (
    <section className='grid grid-rows-18 h-full'>
      <ChatHeader name={channel} />
      <ChatBody messages={messages} />
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
