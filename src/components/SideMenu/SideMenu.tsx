import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { HiCalendar } from 'react-icons/hi';

export const SideMenu: React.FC = () => {
  return (
    <div
      className="
        hidden 
        sm:flex
        sm:flex-col
        w-64
        h-screen
        px-4
        py-8
        bg-white
        border-r
        dark:bg-gray-800 dark:border-gray-600
      "
    >
      <div className="flex space-x-2 justify-center">
        <h2 className="text-2xl font-medium leading-tight text-white">
          Squish
          <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
            Anime
          </span>
        </h2>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link
            className="
              flex
              items-center
              px-4
              py-2
              text-gray-700
              bg-gray-200
              rounded-md
              dark:bg-gray-700 dark:text-gray-200
            "
            to="/"
          >
            <AiFillHome />

            <span className="mx-4 font-medium">Inicio</span>
          </Link>

          <Link
            className="
              flex
              items-center
              px-4
              py-2
              mt-5
              text-gray-600
              transition-colors
              duration-200
              transform
              rounded-md
              dark:text-gray-400
              hover:bg-gray-200
              dark:hover:bg-gray-700 dark:hover:text-gray-200
              hover:text-gray-700
            "
            to="/directorio"
          >
            <HiCalendar />

            <span className="mx-4 font-medium">Directorio</span>
          </Link>

          <Link
            className="
              flex
              items-center
              px-4
              py-2
              mt-5
              text-gray-600
              transition-colors
              duration-200
              transform
              rounded-md
              dark:text-gray-400
              hover:bg-gray-200
              dark:hover:bg-gray-700 dark:hover:text-gray-200
              hover:text-gray-700
            "
            to="/"
          >
            <HiCalendar />

            <span className="mx-4 font-medium">Programacion semanal</span>
          </Link>

          <hr className="my-6 dark:border-gray-600" />

          <Link
            className="
              flex
              items-center
              px-4
              py-2
              mt-5
              text-gray-600
              transition-colors
              duration-200
              transform
              rounded-md
              dark:text-gray-400
              hover:bg-gray-200
              dark:hover:bg-gray-700 dark:hover:text-gray-200
              hover:text-gray-700
            "
            to="/"
          >
            <span className="mx-4 font-medium">Settings</span>
          </Link>
        </nav>

        <div className="flex items-center px-4 -mx-2">
          <h4
            className="
              text-sm
              mx-2
              font-medium
              text-gray-800
              dark:text-gray-200
              hover:underline
            "
          >
            SquishAnime © 2022 Todos los derechos reservados.
          </h4>
        </div>
      </div>
    </div>
  );
};
