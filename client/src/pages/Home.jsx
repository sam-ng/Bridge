import React from 'react';

import HubSidebar from '../components/HubSidebar';

const Home = (props) => {
  return (
    <div className='h-screen flex flex-row justify-center items-center'>
      {/* <div>Welcome to Bridge</div>
      <div>A Hub Dedicated to Connecting With Others </div> */}

      {/* Regions */}

      <HubSidebar className='flex-1'></HubSidebar>
      <div className='flex-1 px-10'>Test</div>
      <div className='flex-3 px-10'>Test</div>
    </div>
  );
};

export default Home;
