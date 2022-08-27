import React from 'react';

const HubSideBarItem = ({ image, url, children, setChannel }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setChannel(children);
  };

  return (
    <li>
      <a
        className='flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2'
        href={url}
        onClick={handleClick}
      >
        <img className='w-12 h-12 rounded-full' src={image} />
        <span className='ml-3'>{children}</span>
      </a>
    </li>
  );
};

export default HubSideBarItem;
