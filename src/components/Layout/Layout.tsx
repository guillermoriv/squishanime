import React from 'react';
import useLastEpisodes from '../../hooks/useLastEpisodes';
import { Navbar } from '../Navbar';
import { SideMenu } from '../SideMenu';

export const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  useLastEpisodes();

  return (
    <div className="bg-slate-600 relative h-screen">
      <div className="absolute w-72 h-full">
        <SideMenu />
      </div>
      <div className="relative md:ml-72 h-full overflow-auto">
        <Navbar />
        {children}
      </div>
    </div>
  );
};
