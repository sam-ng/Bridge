import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const Home = (props) => {
  const [channel, setChannel] = useState('General');
  const [messages, setMessages] = useState([]);

  // const name = uuidv4();
  const name = 'User1';

  const socket = useSocket();
  const prevChannel = usePreviousChannel(channel);

  useEffect(() => {
    initiateSocketConnection(socket);
  }, []);

  useEffect(() => {
    switchChannel(socket, prevChannel, channel);
  }, [channel]);

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
        <HubSidebar setChannel={setChannel} />
      </aside>
      <main className='col-span-5 h-screen'>
        <Chat channel={channel} name={name} />
      </main>
    </div>
  );
};

export default Home;
