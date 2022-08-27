import React from 'react';
import kirigiri_llama from '../assets/images/kirigiri_llama.png';

import HubSideBarItem from './HubSidebarItem';

const HubSidebar = ({
  name,
  channelsLoading,
  channels,
  channel,
  setChannel,
}) => {
  return (
    <nav className='h-full bg-gray-50 dark:bg-slate-800'>
      <div className='overflow-y-auto py-4 px-3 '>
        <ul className='space-y-2'>
          <HubSideBarItem
            url='#'
            image={kirigiri_llama}
            setChannel={setChannel}
          >
            General
          </HubSideBarItem>
          <HubSideBarItem
            url='#'
            image={kirigiri_llama}
            setChannel={setChannel}
          >
            Channel 1
          </HubSideBarItem>
          <HubSideBarItem
            url='#'
            image={kirigiri_llama}
            setChannel={setChannel}
          >
            Channel 2
          </HubSideBarItem>
        </ul>
      </div>
    </nav>
  );
};

export default HubSidebar;
