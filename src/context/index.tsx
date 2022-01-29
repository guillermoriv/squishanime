import React, { createContext, useState } from 'react';

interface Filter {
  genre: string;
}

const initialState = {
  filter: { genre: '' },
  setFilter: (_value: Filter) => {},
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }: { children?: React.ReactChild | React.ReactChild[] }) => {
  const [filter, setFilter] = useState<Filter>(initialState.filter);
  return <GlobalContext.Provider value={{ filter, setFilter }}>{children}</GlobalContext.Provider>;
};
