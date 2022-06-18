import React from 'react';
import kirigiri_llama from '../assets/images/kirigiri_llama.png';

import HubSideBarItem from './HubSidebarItem';

const HubSidebar = (props) => {
  return (
    <ul className='h-screen dark:bg-slate-800 py-2 px-5'>
      <HubSideBarItem image={kirigiri_llama}></HubSideBarItem>
    </ul>
  );
};

export default HubSidebar;
