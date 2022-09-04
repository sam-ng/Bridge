import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatBody = ({
  channel,
  // messagesLoading,
  messages,
  // message,
  // handleMessageSend,
  // handleMessageChange
}) => {
  const currUser = 'user1';

  console.log(messages);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className='row-span-16 flex flex-col p-3 overflow-y-auto scrollbar-thumb-gray-400 scrollbar-thumb-rounded scrollbar-track-white scrollbar-w-4 scrolling-touch'>
      <div className='space-y-4 '>
        {messages?.map(({ content, user }, i) => {
          return (
            <ChatMessage
              content={content}
              isCurrentUser={currUser === user?.username}
              renderProfile={
                i == 0 || messages[i - 1].user?.username !== user?.username
              }
            />
          );
        })}
      </div>
      <div className='h-0 m-0' ref={chatEndRef}></div>
    </section>
  );
};

export default ChatBody;
