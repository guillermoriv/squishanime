import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div>SquishAnime</div>
      <ul className="flex items-center justify-center">
        <li>Inicio</li>
        <li>Animes</li>
        <li>Programación Semanal</li>
      </ul>
      <div>Search bar</div>
    </div>
  );
};
