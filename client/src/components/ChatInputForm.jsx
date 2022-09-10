import { useState } from 'react';

import useSocket from '../hooks/useSocket';
import useAuth from '../hooks/useAuth';

import { sendMessage } from '../services/socket';
import MacroMenu from './MacroMenu';

const ChatInputForm = ({ channelId, setMessages }) => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [showMacros, setShowMacros] = useState(false);

  const { auth } = useAuth();
  const {
    user: { _id: userId },
  } = auth;

  const handleMessageChange = (e) => {
    if (e.target.value === '/m') setShowMacros(true);
    else setShowMacros(false);
    setMessage(e.target.value);
  };

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (!message) return;

    const data = {
      content: message,
      channelId,
      userId,
    };
    sendMessage(socket, data, setMessages);
    setMessage('');
  };

  return (
    <div className='row-span-1'>
      {showMacros && <MacroMenu />}
      <form
        className=' flex flex-row p-2 border-t-2 border-gray-200 '
        onSubmit={handleMessageSend}
      >
        <input
          className='w-full p-2 rounded-md focus:outline-none focus:placeholder-gray-300 placeholder:text-gray-500 bg-gray-200'
          type='text'
          placeholder='Send a message.'
          value={message}
          onChange={handleMessageChange}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 px-4 py-2 rounded focus:shadow-outline'
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInputForm;
