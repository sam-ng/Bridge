import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { io } from 'socket.io-client';

import { SERVER_URL } from '../constants/api';

import ChatHeader from './ChatHeader';
import Channels from './Channels';
import ChatBody from './ChatBody';
import ChatInputForm from './ChatInputForm';

import usePreviousChannel from '../hooks/usePreviousChannel';

import {
  initiateSocketConnection,
  switchChannel,
  fetchChannels,
  fetchChannelMessages,
  sendMessage,
  subscribeToMessages,
} from '../services/socket';

const Chat = ({ channel }) => {
  const [channels, setChannels] = useState([]);
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
  const socket = useSocket();

  const name = uuidv4();

  const prevChannelRef = usePreviousChannel(channel);
  const prevChannel = prevChannelRef.current;

  // useEffect(() => {
  //   if (prevChannel && channel) {
  //     //   switchChannel(prevChannel, channel);
  //     setChannel(channel);
  //   } else if (channel) {
  //     //   initiateSocketConnection(channel, name);
  //   }
  // }, [channel]);

  // useEffect(() => {
  //   fetchChannels().then((res) => {
  //     setChannels(res);
  //     setChannelsLoading(false);
  //   });

  //   subscribeToMessages((err, data) => {
  //     setMessages((messages) => [...messages, data]);
  //   });
  // }, []);

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
