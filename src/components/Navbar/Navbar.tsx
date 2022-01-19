import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between bg-slate-800 text-white font-bold p-3">
      <div className="text-3xl">SquishAnime</div>
      <ul className="flex items-center justify-center">
        <li className="mx-2">Inicio</li>
        <li className="mx-2">Animes</li>
        <li className="mx-2">Programación Semanal</li>
      </ul>
      <div>Search bar</div>
    </div>
  );
};
