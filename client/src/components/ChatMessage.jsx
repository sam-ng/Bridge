import kirigiri_llama from '../assets/images/kirigiri_llama.png';

const ChatMessage = ({ content, isCurrentUser, renderProfile }) => {
  return (
    <div
      className={
        'flex flex-row flex-items-start space-y-2' +
        (isCurrentUser ? ' justify-end ' : ' justify-start ')
      }
    >
      <div
        className={
          'mx-2 p-2 rounded-lg text-base items-start' +
          (isCurrentUser
            ? ' order-first rounded-br-none bg-blue-500 text-white'
            : ' order-last rounded-tl-none bg-gray-200')
        }
      >
        <span className='inline-block'>{content}</span>
      </div>
      {renderProfile ? (
        <img className='w-8 h-8 rounded-full' src={kirigiri_llama} />
      ) : (
        <div className='w-8'></div>
      )}
    </div>
  );
};

export default ChatMessage;
