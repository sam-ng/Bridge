import { useEffect, useRef } from 'react';

const usePreviousChannel = (channel) => {
  const prevChannelRef = useRef();

  useEffect(() => {
    prevChannelRef.current = channel;
  }, [channel]);

  return prevChannelRef.current;
};

export default usePreviousChannel;
