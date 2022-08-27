const ChatHeader = ({ name }) => {
  return (
    <header className='row-span-1 py-2 border-b-2 border-gray-200 flex justify-center items-center '>
      <span className='text-3xl font-bold'>{name}</span>
    </header>
  );
};

export default ChatHeader;
