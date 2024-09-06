import React, { createContext, useMemo, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// Define the type for the socket object, which can either be `Socket` or `null`
type SocketContextType = Socket | null;

// Create the context with an initial value of `null`
const SocketContext = createContext<SocketContextType>(null);

// Hook to use the socket instance
export const useSocketContext = (): SocketContextType => {
  const socket = useContext(SocketContext);
  return socket;
};

// Define the props for the SocketProvider component
interface SocketProviderProps {
  children: ReactNode;
}

// The SocketProvider component which provides the socket instance to its children
export const SocketContextProvider: React.FC<SocketProviderProps> = ({ children }) => {
  // Initialize the socket connection only once with useMemo
  const socket = useMemo(() => io("http://192.168.1.8:8000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
