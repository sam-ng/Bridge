const Channels = ({ name, channelsLoading, channels, channel, setChannel }) => {
  return (
    <aside className='border-solid border-r border-black'>
      <div className='flex flex-col items-start justify-center h-70 px-8 border-solid border-b border-black'>
        <span className='block text-lg font-bold'>@ {name}</span>
      </div>
      <div>
        <ul>
          {channelsLoading ? (
            <li>
              <span>Loading channels...</span>
            </li>
          ) : channels.length ? (
            channels.map((c, i) => (
              <li
                key={i}
                onClick={() => setChannel(c.name)}
                className={c.name === channel ? 'bg-black color-white' : ''}
              >
                <span className>{c.name}</span>
              </li>
            ))
          ) : (
            <li>
              <span className=''>No channels available.</span>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Channels;
