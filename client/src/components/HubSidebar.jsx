import React from 'react';
import kirigiri_llama from '../assets/images/kirigiri_llama.png';

import HubSideBarItem from './HubSidebarItem';

const HubSidebar = ({ channels, channelsLoading, setChannelId }) => {
  return (
    <nav className='h-full bg-gray-50 dark:bg-slate-800'>
      <div className='overflow-y-auto py-4 px-3 '>
        <ul className='space-y-2'>
          {channelsLoading ? (
            <div>Loading...</div>
          ) : (
            channels?.map((channel) => (
              <HubSideBarItem
                url='#'
                image={kirigiri_llama}
                channelId={channel._id}
                setChannelId={setChannelId}
              >
                {channel.name}
              </HubSideBarItem>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

export default HubSidebar;
