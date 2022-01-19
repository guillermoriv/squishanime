import React, { createContext, useContext, useState } from 'react';
import { AppState, LastEpisode } from '../interfaces';

const initialState: AppState = {
  lastEpisodes: [],
  setLastEpisodes: (value: LastEpisode[]) => {},
};

export const GlobalContext = createContext<AppState>(initialState);

export const GlobalProvider = ({ children }: { children?: React.ReactChild | React.ReactChild[] }) => {
  const [lastEpisodes, setLastEpisodes] = useState<LastEpisode[]>(initialState.lastEpisodes);
  return <GlobalContext.Provider value={{ lastEpisodes, setLastEpisodes }}>{children}</GlobalContext.Provider>;
};
