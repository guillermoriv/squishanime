import React, { createContext, useContext, useState } from 'react';
import { AppState, LastEpisode } from '../interfaces';

const initialState: AppState = {
  lastEpisodes: [],
  setLastEpisodes: (value: LastEpisode[]) => {},
  loadingLastEpisodes: false,
  setLoadingLastEpisodes: (value: boolean) => {},
};

export const GlobalContext = createContext<AppState>(initialState);

export const GlobalProvider = ({ children }: { children?: React.ReactChild | React.ReactChild[] }) => {
  const [lastEpisodes, setLastEpisodes] = useState<LastEpisode[]>(initialState.lastEpisodes);
  const [loadingLastEpisodes, setLoadingLastEpisodes] = useState<boolean>(initialState.loadingLastEpisodes);

  return (
    <GlobalContext.Provider value={{ lastEpisodes, setLastEpisodes, loadingLastEpisodes, setLoadingLastEpisodes }}>
      {children}
    </GlobalContext.Provider>
  );
};
