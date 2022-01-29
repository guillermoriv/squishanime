import React, { useContext, useEffect, useState } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsBookHalf, BsFillCalendarDateFill } from 'react-icons/bs';
import { AiOutlineClear } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../context';
import useGenres, { Genre } from '../../hooks/useGenres';

export const SideMenu: React.FC = () => {
  const [active, setActive] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const { filter, setFilter } = useContext(GlobalContext);
  const { genres, loading } = useGenres();
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname.split('/')[1]);
  }, [location]);

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
        overflow-auto
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
            className={`
              
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
              ${
                active === ''
                  ? 'dark:bg-gray-700 dark:text-gray-200 text-gray-700'
                  : 'dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 dark:text-gray-400'
              } 
            `}
            to="/"
          >
            <AiFillHome />

            <span className="mx-4 font-medium">Inicio</span>
          </Link>

          <Link
            className={`
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
              ${
                active === 'directorio'
                  ? 'dark:bg-gray-700 dark:text-gray-200 text-gray-700'
                  : 'dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 dark:text-gray-400'
              } 
            `}
            to="/directorio"
          >
            <BsBookHalf />
            <span className="mx-4 font-medium">Directorio</span>
          </Link>

          <Link
            className={`
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
              ${
                active === 'programacion'
                  ? 'dark:bg-gray-700 dark:text-gray-200 text-gray-700'
                  : 'dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700 dark:text-gray-400'
              } 
            `}
            to="/programacion"
          >
            <BsFillCalendarDateFill />
            <span className="mx-4 font-medium">Programacion semanal</span>
          </Link>

          <hr className="my-6 dark:border-gray-600" />
          {active === 'directorio' && (
            <div className="text-white my-2">
              <div className="flex justify-between items-center mb-3">
                <span>Filtrado por generos:</span>
                <AiOutlineClear
                  className="cursor-pointer"
                  size={20}
                  onClick={() => {
                    setFilter({ ...filter, genre: '' });
                    setGenre('');
                  }}
                />
              </div>
              {!loading ? (
                <ul className="flex flex-wrap">
                  {genres.map((item: Genre, index: number) => {
                    return (
                      <li
                        className={`px-3 py-2 m-1 bg-gray-500 rounded-xl cursor-pointer flex-grow text-center transition-all ${
                          genre === item.name ? 'bg-gray-600' : ''
                        }`}
                        onClick={() => {
                          setFilter({ ...filter, genre: item.name });
                          setGenre(item.name);
                        }}
                      >
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="flex">
                  <li className="flex items-center">
                    Cargando generos...
                    <div
                      className="spinner-border animate-spin inline-block ml-4 w-8 h-8 border-4 rounded-full text-blue-300"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </li>
                </ul>
              )}
            </div>
          )}
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
