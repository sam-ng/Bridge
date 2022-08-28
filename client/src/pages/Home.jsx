import { useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

import { SERVER_URL } from '../constants/api';

import HubSidebar from '../components/HubSidebar';
import Chat from '../components/Chat';
import SocketContext from '../context/SocketProvider';
import { useEffect } from 'react';
import { initiateSocketConnection } from '../services/socket';

const Home = (props) => {
  const [channel, setChannel] = useState('General');

  // const name = uuidv4();
  const name = 'User1';
  const socket = io(SERVER_URL, {
    query: { channel, name },
    withCredentials: true,
  });

  initiateSocketConnection(socket, channel, name);

  return (
    <div className='grid grid-cols-6 h-screen'>
      {/* <div>Welcome to Bridge</div>
      <div>A Hub Dedicated to Connecting With Others </div> */}

      {/* Regions */}

      <aside className='col-span-1 h-screen'>
        <HubSidebar setChannel={setChannel} />
      </aside>
      <main className='col-span-5 h-screen'>
        <Chat channel={(channel, name)} />
      </main>
    </div>
  );
};

export default Home;
