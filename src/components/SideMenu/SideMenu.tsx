import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { HiCalendar } from 'react-icons/hi';

export const SideMenu: React.FC = () => {
  return (
    <div className="bg-slate-800 relative text-white shadow-lg h-full">
      <div className="text-3xl flex items-center justify-center h-20 font-bold">
        <Link to="/">SquishAnime</Link>
      </div>
      <div className="mt-28">
        <ul>
          <li className="mx-2 mb-6 text-xl">
            <div className="flex items-center">
              <AiFillHome className="mr-3" />
              <Link to="/">Inicio</Link>
            </div>
            <hr />
          </li>
          <li className="mx-2 mb-6 text-xl">
            <div className="flex items-center">
              <HiCalendar className="mr-3" />
              <Link to="/">Directorio</Link>
            </div>
            <hr />
          </li>
          <li className="mx-2 mb-6 text-xl">
            <div className="flex items-center">
              <HiCalendar className="mr-3" />
              <Link to="/">Semana</Link>
            </div>
            <hr />
          </li>
        </ul>
      </div>
      <div className="bottom-0 text-justify p-4 absolute text-sm">
        <div>SquishAnime © 2022 Todos los derechos reservados</div>
        <div>
          Ningun video se encuentra alojado en nuestros servidores. Todos los vídeos que ves en nuestra plataforma son
          tomados de internet, de sitios webs gratuitos.
        </div>
      </div>
    </div>
  );
};
