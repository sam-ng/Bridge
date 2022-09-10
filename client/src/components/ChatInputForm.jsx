import { useState } from 'react';

import { isKeyPrintable } from '../constants/api';

import useSocket from '../hooks/useSocket';
import useAuth from '../hooks/useAuth';

import { sendMessage } from '../services/socket';
import MacroMenu from './MacroMenu';

const ChatInputForm = ({ channelId, setMessages }) => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [showMacros, setShowMacros] = useState(false);
  const [macroMode, setMacroMode] = useState(true);

  const { auth } = useAuth();
  const {
    user: { _id: userId, macros },
  } = auth;

  const handleToggleMode = () => {
    setMacroMode((prevState) => !prevState);
  };

  // const handleCtrlKeyDown = (e) => {
  //   console.log(e);
  //   if (e.altKey) {
  //     e.preventDefault();
  //     if (isKeyPrintable(e)) setMessage((prevMessage) => prevMessage + e.key);
  //   }
  // };

  const handleMessageChange = (e) => {
    if (!macroMode) {
      setMessage(e.target.value);
      return;
    }
    if (e.target.value === '/m') setShowMacros(true);
    else setShowMacros(false);

    const matches = macros?.filter(
      (macro) =>
        macro.macroKeys === e.target.value.slice(-macro.macroKeys.length - 1)
    );

    if (matches.length > 0) {
      setMessage(matches[0].macroOutput);
      return;
    } else setMessage(e.target.value);
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
      {showMacros && macroMode && <MacroMenu />}
      <form
        className=' flex flex-row p-2 border-t-2 border-gray-200 '
        onSubmit={handleMessageSend}
      >
        <button
          className={
            'text-white font-bold ml-2 px-4 py-2 rounded focus:shadow-outline ' +
            (macroMode
              ? 'bg-red-500 hover:bg-red-700'
              : 'bg-green-500 hover:bg-green-700')
          }
          type='button'
          onClick={handleToggleMode}
        >
          {macroMode ? <strong>MACRO</strong> : <strong>TEXT</strong>}
        </button>
        <input
          className='w-full p-2 mx-2 rounded-md focus:outline-none focus:placeholder-gray-300 placeholder:text-gray-500 bg-gray-200'
          type='text'
          placeholder='Send a message.'
          value={message}
          onChange={handleMessageChange}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded focus:shadow-outline'
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInputForm;
