import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { SERVER_URL } from '../constants/api';

import useFetch from '../hooks/useFetch';
import useFetchPrivate from '../hooks/useFetchPrivate';
import useAuth from '../hooks/useAuth';

import HubSidebar from '../components/HubSidebar';
import AddChannelModal from '../components/AddChannelModal';
import Chat from '../components/Chat';

import useSocket from '../hooks/useSocket';
import usePreviousChannel from '../hooks/usePreviousChannel';

import {
  initiateSocketConnection,
  subscribeToChannels,
  switchChannel,
} from '../services/socket';

const Home = () => {
  const { data, loading, error, setUrl } = useFetchPrivate(
    `${SERVER_URL}/channels`,
    {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    }
  );
  const { auth } = useAuth();
  const {
    user: { _id: userId },
  } = auth;

  const [channels, setChannels] = useState([]);
  const [channelId, setChannelId] = useState('');
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);

  const socket = useSocket();
  const prevChannel = usePreviousChannel(channelId);

  useEffect(() => {
    initiateSocketConnection(socket, userId, setChannelId);
  }, [socket, userId]);

  useEffect(() => {
    if (data) setChannels(data.channels);
    else setChannels([]);
  }, [data]);

  useEffect(() => {
    if (socket.connected) subscribeToChannels(socket, setChannels);
  }, [socket, socket.connected]);

  useEffect(() => {
    switchChannel(socket, prevChannel, channelId);
  }, [socket, prevChannel, channelId]);

  return (
    data && (
      <div className='grid grid-cols-6 h-screen'>
        {/* <div>Welcome to Bridge</div>
      <div>A Hub Dedicated to Connecting With Others </div> */}

        {/* Regions */}

        <aside className='col-span-1 h-screen'>
          <HubSidebar
            channels={channels}
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
          <Chat
            channelId={channelId}
            channelName={
              channels.filter((channel) => channel._id === channelId)[0]?.name
            }
          />
        </main>
      </div>
    )
  );
};

export default Home;
