import { useContext } from 'react';
import { createContext } from 'react';

// export const socket = io(SERVER_URL);
export const SocketContext = createContext();

// export const SocketProvider = ({ children }) => {
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket == undefined)
    throw new Error('useSocket must be used within a SocketProvider.');
  return socket;
};

export default SocketContext;
