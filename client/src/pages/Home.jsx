import { useState } from 'react';

import HubSidebar from '../components/HubSidebar';
import Chat from '../components/Chat';

const Home = (props) => {
  const [channel, setChannel] = useState('General');

  return (
    <div className='grid grid-cols-6 h-screen'>
      {/* <div>Welcome to Bridge</div>
      <div>A Hub Dedicated to Connecting With Others </div> */}

      {/* Regions */}

      <aside className='col-span-1 h-screen'>
        <HubSidebar setChannel={setChannel} />
      </aside>
      <main className='col-span-5 h-screen'>
        <Chat channel={channel} />
      </main>
    </div>
  );
};

export default Home;
