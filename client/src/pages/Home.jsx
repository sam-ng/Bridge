import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { SERVER_URL } from '../constants/api';

import useFetch from '../hooks/useFetch';

import HubSidebar from '../components/HubSidebar';
import AddChannelModal from '../components/AddChannelModal';
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

  const [channelId, setChannelId] = useState('');
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);

  const user = 'User1';
  const userId = '630ed7be14c08c76e3183baa';

  const socket = useSocket();
  const prevChannel = usePreviousChannel(channelId);

  useEffect(() => {
    initiateSocketConnection(socket, userId, setChannelId);
  }, [socket, userId]);

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
          setShowAddChannelModal={setShowAddChannelModal}
        />
        <AddChannelModal
          isOpen={showAddChannelModal}
          setShowAddChannelModal={setShowAddChannelModal}
        />
      </aside>
      <main className='col-span-5 h-screen'>
        <Chat channelId={channelId} userId={userId} />
      </main>
    </div>
  );
};

export default Home;
