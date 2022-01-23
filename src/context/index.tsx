import React, { createContext } from 'react';

const initialState = {};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: { children?: React.ReactChild | React.ReactChild[] }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
