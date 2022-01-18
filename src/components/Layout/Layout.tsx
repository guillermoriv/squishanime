import React from 'react';
import { Navbar } from '../Navbar';

export const Layout: React.FC = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
