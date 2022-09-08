import { useEffect, useRef } from 'react';

import useAuth from '../hooks/useAuth';

import ChatMessage from './ChatMessage';

const ChatBody = ({ channel, messages }) => {
  const { auth } = useAuth();
  const {
    user: { _id: userId },
  } = auth;

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className='row-span-14 flex flex-col p-3 overflow-y-auto scrollbar-thumb-gray-400 scrollbar-thumb-rounded scrollbar-track-white scrollbar-w-4 scrolling-touch'>
      <div className='space-y-4 '>
        {messages?.map(({ _id, content, user }, i) => {
          return (
            <ChatMessage
              key={_id}
              content={content}
              isCurrentUser={user?._id === userId}
              renderProfile={i == 0 || messages[i - 1].user?._id !== user?._id}
            />
          );
        })}
      </div>
      <div className='h-0 m-0' ref={chatEndRef}></div>
    </section>
  );
};

export default ChatBody;
