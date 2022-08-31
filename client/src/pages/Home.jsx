import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { SERVER_URL } from '../constants/api';

import useFetch from '../hooks/useFetch';

import HubSidebar from '../components/HubSidebar';
import Chat from '../components/Chat';
import { useSocket } from '../context/SocketProvider';
import usePreviousChannel from '../hooks/usePreviousChannel';

import {
  fetchChannels,
  initiateSocketConnection,
  subscribeToMessages,
  switchChannel,
} from '../services/socket';

const Home = () => {
  const { data, loading, error } = useFetch(`${SERVER_URL}/channels`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  console.log(data);

  const [channelId, setChannelId] = useState('630edb20764e8a7c54eb8394');

  const name = 'User1';

  const socket = useSocket();
  const prevChannel = usePreviousChannel(channelId);

  useEffect(() => {
    initiateSocketConnection(socket);
  }, [socket]);

  useEffect(() => {
    switchChannel(socket, prevChannel, channelId);
  }, [socket, prevChannel, channelId]);

  // useEffect(() => {
  //   fetchChannels().then((res) => {
  //     setChannels(res);
  //     setChannelsLoading(false);
  //   });

  //   subscribeToMessages(socket, (err, data) => {
  //     setMessages((messages) => [...messages, data]);
  //   });
  // }, []);

  return (
    <div className='grid grid-cols-6 h-screen'>
      {/* <div>Welcome to Bridge</div>
      <div>A Hub Dedicated to Connecting With Others </div> */}

      {/* Regions */}

      <aside className='col-span-1 h-screen'>
        <HubSidebar
          channels={data?.channels}
          channelsLoading={loading}
          setChannelId={setChannelId}
        />
      </aside>
      <main className='col-span-5 h-screen'>
        <Chat channelId={channelId} name={name} />
      </main>
    </div>
  );
};

export default Home;
