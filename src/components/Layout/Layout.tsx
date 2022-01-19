import React from 'react';
import useLastEpisodes from '../../hooks/useLastEpisodes';
import { Navbar } from '../Navbar';

export const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  useLastEpisodes();

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
