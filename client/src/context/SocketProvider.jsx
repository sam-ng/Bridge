import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

import { SERVER_URL } from '../constants/api';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io(SERVER_URL, {
    withCredentials: true,
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket == undefined)
    throw new Error('useSocket must be used within a SocketProvider.');
  return socket;
};

export default SocketContext;
