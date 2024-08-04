import { createContext } from 'react';

const ServerContext = createContext('');

export const ServerContextProvider = ({ children }) => {
  const url = import.meta.env.DEV ? 'http://localhost:5000' : import.meta.env.VITE_SERVER_URL;
  return (
    <ServerContext.Provider value={url}>
      {children}
    </ServerContext.Provider>
  );
};

export default ServerContext;
