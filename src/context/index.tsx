import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: { children?: React.ReactChild | React.ReactChild[] }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
