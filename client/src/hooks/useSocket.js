import { useContext } from 'react';
import SocketContext from '../context/SocketProvider';

const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === undefined)
    throw new Error('useSocket must be used within a SocketProvider.');
  return socket;
};

export default useSocket;
