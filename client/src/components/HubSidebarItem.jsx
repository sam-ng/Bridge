// import { FaEllipsisV } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const HubSideBarItem = ({ image, url, channelId, setChannelId, children }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setChannelId(channelId);
  };

  return (
    <li className='flex flex-row items-center justify-between'>
      <a
        className='w-full flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2'
        href={url}
        onClick={handleClick}
      >
        <img className='w-12 h-12 rounded-full' src={image} />
        <span className='ml-3'>{children}</span>
      </a>
      <button className='m-2 p-2 text-red-900'>
        <FaTimes />
      </button>
    </li>
  );
};

export default HubSideBarItem;
