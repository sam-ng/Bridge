import { FaPlus } from 'react-icons/fa';
import kirigiri_llama from '../assets/images/kirigiri_llama.png';

import HubSideBarItem from './HubSidebarItem';

const HubSidebar = ({
  channels,
  channelsLoading,
  setChannelId,
  setShowAddChannelModal,
}) => {
  const handleAddChannel = () => {
    setShowAddChannelModal(true);
  };

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
          <li key='add'>
            <button
              className='w-full flex items-center text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2'
              onClick={handleAddChannel}
            >
              <FaPlus className='w-12 h-12 rounded-full text-green-900' />
              <span className='ml-3'>Add Channel</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HubSidebar;
