import React from 'react';
import kirigiri_llama from '../assets/images/kirigiri_llama.png';

import { SERVER_URL } from '../constants/api';

import HubSideBarItem from './HubSidebarItem';

import useFetch from '../hooks/useFetch';

const HubSidebar = ({ name, channel, setChannel }) => {
  const { data, isLoading, error } = useFetch(`${SERVER_URL}/channels`, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  return (
    <nav className='h-full bg-gray-50 dark:bg-slate-800'>
      <div className='overflow-y-auto py-4 px-3 '>
        <ul className='space-y-2'>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data?.channels.map((channel) => (
              <HubSideBarItem
                url='#'
                image={kirigiri_llama}
                setChannel={setChannel}
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
