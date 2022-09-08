import { useState } from 'react';
// import { FaEllipsisV } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

import useSocket from '../hooks/useSocket';

import { deleteChannel } from '../services/socket';

const HubSideBarItem = ({ image, url, channelId, setChannelId, children }) => {
  const socket = useSocket();
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const userId = '630ed7be14c08c76e3183baa';

  const handleClick = (e) => {
    e.preventDefault();
    setChannelId(channelId);
  };

  const handleDelete = (e) => {
    deleteChannel(socket, channelId, userId);
  };

  return (
    <li
      className='flex flex-row items-center justify-between rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'
      key={channelId}
      onMouseEnter={() => setShowDeleteBtn(true)}
      onMouseLeave={() => setShowDeleteBtn(false)}
    >
      <a
        className='w-full h-full flex items-center text-base font-normal text-gray-900 dark:text-white p-2'
        href={url}
        onClick={handleClick}
      >
        <img className='w-12 h-12 rounded-full' src={image} />
        <span className='ml-3'>{children}</span>
      </a>
      <button
        className={
          'mx-4 hover:text-red-500 ' +
          (showDeleteBtn ? 'text-red-900' : 'text-slate-800')
        }
        onClick={handleDelete}
      >
        <FaTimes className='w-12 h-12' />
      </button>
    </li>
  );
};

export default HubSideBarItem;
