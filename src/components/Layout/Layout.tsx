import React, { useState } from 'react';

import useLastEpisodes from '../../hooks/useLastEpisodes';
import { Navbar } from '../Navbar';
import { SideMenu } from '../SideMenu';

export const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(true);
  useLastEpisodes();

  return (
    <div className="h-screen bg-[#0b0c2a] overflow-auto">
      {/* <div className="absolute w-72 h-full">
        <SideMenu />
      </div> */}
      <Navbar />

      <div className="container w-full px-4 mx-auto">
        <div
          className={`bg-gray-300 rounded-lg py-5 px-6 m-4 text-base justify-between text-gray-800 ${
            open ? 'flex' : 'hidden'
          }`}
          role="alert"
        >
          Página en construcción, aún estamos trabajando para terminar, no te impacientes por favor!{' '}
          <span className="font-bold cursor-pointer" onClick={() => setOpen(false)}>
            X
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};
