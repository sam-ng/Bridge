import React from 'react';

const HubSideBarItem = (props) => {
  return (
    <li>
      <a href={props.url}>
        <img className='h-12 w-12 rounded-full' src={props.image} />
      </a>
      <a href={props.url}>
        <img className='h-12 w-12 rounded-full' src={props.image} />
      </a>
      <a href={props.url}>
        <img className='h-12 w-12 rounded-full' src={props.image} />
      </a>
    </li>
  );
};

export default HubSideBarItem;
