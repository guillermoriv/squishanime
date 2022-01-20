import React from 'react';
import useLastEpisodes from '../../hooks/useLastEpisodes';
import { Footer } from '../Footer';
import { Navbar } from '../Navbar';

export const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  useLastEpisodes();

  return (
    <div className="bg-slate-600 relative min-h-screen overflow-auto">
      <Navbar />
      <div className="h-full mb-32">{children}</div>
      <Footer />
    </div>
  );
};
