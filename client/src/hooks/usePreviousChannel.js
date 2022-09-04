import { useEffect, useRef } from 'react';

const usePreviousChannel = (channel) => {
  const prevChannelRef = useRef(null);

  useEffect(() => {
    prevChannelRef.current = channel;
  }, [channel]);

  return prevChannelRef.current;
};

export default usePreviousChannel;
