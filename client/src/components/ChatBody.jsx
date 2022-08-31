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

  return (
    <section className='row-span-16 flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-gray-400 scrollbar-thumb-rounded scrollbar-track-white scrollbar-w-4 scrolling-touch'>
      {messages?.map(({ content, user }, i) => {
        return (
          <ChatMessage
            content={content}
            isCurrentUser={currUser === user}
            renderProfile={i == 0 || messages[i - 1].user !== user}
          />
        );
      })}
    </section>
  );
};

export default ChatBody;
