import { useState } from 'react';

const ChatInputForm = ({ channel, user }) => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    if (!message) return;

    e.preventDefault();
    const data = {
      channel,
      user: user,
      body: message,
    };
    // setMessages((messages) => [...messages, data]);
    // sendMessage(data);
    setMessage('');
  };

  return (
    <form className='row-span-1 p-2 border-t-2 border-gray-200 '>
      <input
        className='w-full p-2 rounded-md focus:outline-none focus:placeholder-gray-300 placeholder:text-gray-500 bg-gray-200'
        type='text'
        placeholder='Send a message.'
        onChange={handleMessageChange}
      ></input>
    </form>
  );
};

export default ChatInputForm;
