import { createContext } from 'react';
import { io } from 'socket.io-client';

import { SERVER_URL } from '../constants/api';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const userId = '630ed7be14c08c76e3183baa';

  const socket = io(SERVER_URL, {
    withCredentials: true,
    query: { userId },
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
