import React, { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import axios from 'axios';

import './index.scss';
import { FaHamburger } from 'react-icons/fa';

interface Search {
  id: string;
  image: string;
  title: string;
  type: string;
}

export const Navbar: React.FC = () => {
  const [resultSearch, setResultSearch] = useState<Search[]>([]);
  const [canShow, setCanShow] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const ref: MutableRefObject<null | any> = useRef(null);
  const refDropdown: MutableRefObject<null | any> = useRef(null);

  function handleClickOutside(event: Event) {
    if (!ref.current.contains(event.target)) {
      setCanShow(false);
    }
  }

  function handleClickDropdown(event: Event) {
    if (!refDropdown.current.contains(event.target)) {
      setShowDropdown(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickDropdown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickDropdown);
    };
  }, [ref, refDropdown]);

  async function handleChange(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    setError(false);
    setResultSearch([]);
    const searchValue: string = (e.target as any).value;
    clearTimeout(timer!);

    if (searchValue.length >= 3) {
      setCanShow(true);
      setIsLoading(true);
      const newTimer = setTimeout(async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}search/${searchValue}`);

          setResultSearch(data.search);
          setIsLoading(false);
        } catch (e) {
          console.error(e);
          setIsLoading(false);
          setError(true);
        }
      }, 700);

      setTimer(newTimer);
    } else {
      setCanShow(false);
    }
  }

  return (
    <header className="header">
      <div className="container w-full px-4 mx-auto">
        <div className="flex items-center justify-between lg:justify-start">
          <Link className="flex items-center" to="/">
            <h2 className="text-2xl font-medium leading-tight text-white">
              Squish
              <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
                Anime
              </span>
            </h2>
          </Link>
          <div className="hidden lg:block flex-auto items-center text-center">
            <ul>
              <li className="header-item">
                <Link className="text-gray-300 hover:text-gray-400" to="/">
                  Inicio
                </Link>
              </li>
              <li className="header-item">
                <Link className="text-gray-300 hover:text-gray-400" to="/directorio">
                  Directorio
                </Link>
              </li>
              <li className="header-item">
                <Link className="text-gray-300 hover:text-gray-400" to="/programacion">
                  Programación semanal
                </Link>
              </li>
            </ul>
          </div>
          <div ref={refDropdown} className="block relative  lg:hidden">
            <FaHamburger
              className="cursor-pointer"
              color="white"
              size={30}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <ul
              className={`${
                !showDropdown ? 'hidden' : ''
              } w-80 flex flex-col absolute z-10 right-3 top-10 p-5 bg-white rounded-md`}
            >
              <li className="header-item">
                <Link className="text-black hover:text-gray-600" to="/" onClick={() => setShowDropdown(false)}>
                  Inicio
                </Link>
              </li>
              <li className="header-item">
                <Link
                  className="text-black hover:text-gray-600"
                  to="/directorio"
                  onClick={() => setShowDropdown(false)}
                >
                  Directorio
                </Link>
              </li>
              <li className="header-item">
                <Link
                  className="text-black hover:text-gray-600"
                  to="/programacion"
                  onClick={() => setShowDropdown(false)}
                >
                  Programación semanal
                </Link>
              </li>
              <li className="header-item">
                <div className="block relative">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex justify-end">
                      <div className="mb-3 w-96 flex-grow lg:flex-grow-0 ">
                        <label htmlFor="search-input" className="form-label hidden">
                          Text input
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            onFocus={() => {
                              if (resultSearch.length > 0 || error) {
                                setCanShow(true);
                              }
                            }}
                            onChange={handleChange}
                            autoComplete="off"
                            className="
                          form-control
                          block
                          w-full
                          px-3
                          py-3
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                            id="search-input"
                            placeholder="Buscar..."
                          />
                          <FiDelete
                            className="block absolute top-3 right-4 cursor-pointer"
                            size={25}
                            onClick={() => {
                              const search = document.getElementById('search-input');
                              (search as any).value = '';
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  {!isLoading ? (
                    <div
                      ref={ref}
                      className={`${canShow ? 'flex' : 'hidden'} justify-end w-full absolute right-0 top-16 z-10`}
                    >
                      {!error ? (
                        <ul className="rounded-lg border bg-white w-96 flex-grow lg:flex-grow-0 text-gray-900 h-52 overflow-auto">
                          {resultSearch.map((item: Search, index: number) => {
                            return (
                              <li className="px-6 py-2 border-b border-gray-200 w-full" key={index}>
                                <Link to={`../anime/${item.id}`} className="flex justify-between">
                                  <div className="flex flex-col w-52">
                                    <span>{item.title}</span>
                                    {item.type.toLowerCase() === 'anime' ? (
                                      <span className="bg-green-500 text-xs p-1 rounded-lg text-white w-16 text-center">
                                        {item.type}
                                      </span>
                                    ) : (
                                      <span className="bg-pink-600 text-xs p-1 rounded-lg text-white w-16 text-center">
                                        {item.type}
                                      </span>
                                    )}
                                  </div>
                                  <img
                                    src={
                                      item.image !== null
                                        ? item.image
                                        : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
                                    }
                                    className="rounded-lg h-14 shadow-lg"
                                  />
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <ul className="rounded-lg border bg-white w-96 flex-grow lg:flex-grow-0 text-gray-900 overflow-auto">
                          <li className="px-6 py-2 border-b border-gray-200 w-full">
                            No fueron encontrado resultados...
                          </li>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <div
                      ref={ref}
                      className={`${canShow ? 'flex' : 'hidden'} justify-end w-full absolute right-0 top-16 z-10`}
                    >
                      <div className="rounded-lg border flex justify-center items-center bg-white w-96 flex-grow lg:flex-grow-0 text-gray-900 h-28">
                        <Triangle color="#000000" height={80} width={80} />
                      </div>
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
          <div className="hidden lg:block relative">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex justify-end">
                <div className="mb-3 w-96 flex-grow lg:flex-grow-0 ">
                  <label htmlFor="search-input" className="form-label hidden">
                    Text input
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      onFocus={() => {
                        if (resultSearch.length > 0 || error) {
                          setCanShow(true);
                        }
                      }}
                      onChange={handleChange}
                      autoComplete="off"
                      className="
                          form-control
                          block
                          w-full
                          px-3
                          py-3
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        "
                      id="search-input"
                      placeholder="Buscar..."
                    />
                    <FiDelete
                      className="block absolute top-3 right-4 cursor-pointer"
                      size={25}
                      onClick={() => {
                        const search = document.getElementById('search-input');
                        (search as any).value = '';
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
            {!isLoading ? (
              <div
                ref={ref}
                className={`${canShow ? 'flex' : 'hidden'} justify-end w-full absolute right-0 top-16 z-10`}
              >
                {!error ? (
                  <ul className="rounded-lg border bg-white w-96 flex-grow lg:flex-grow-0 text-gray-900 h-52 overflow-auto">
                    {resultSearch.map((item: Search, index: number) => {
                      return (
                        <li className="px-6 py-2 border-b border-gray-200 w-full" key={index}>
                          <Link to={`../anime/${item.id}`} className="flex justify-between">
                            <div className="flex flex-col w-52">
                              <span>{item.title}</span>
                              {item.type.toLowerCase() === 'anime' ? (
                                <span className="bg-green-500 text-xs p-1 rounded-lg text-white w-16 text-center">
                                  {item.type}
                                </span>
                              ) : (
                                <span className="bg-pink-600 text-xs p-1 rounded-lg text-white w-16 text-center">
                                  {item.type}
                                </span>
                              )}
                            </div>
                            <img
                              src={
                                item.image !== null
                                  ? item.image
                                  : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
                              }
                              className="rounded-lg h-14 shadow-lg"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <ul className="rounded-lg border bg-white w-96 flex-grow lg:flex-grow-0 text-gray-900 overflow-auto">
                    <li className="px-6 py-2 border-b border-gray-200 w-full">No fueron encontrado resultados...</li>
                  </ul>
                )}
              </div>
            ) : (
              <div
                ref={ref}
                className={`${canShow ? 'flex' : 'hidden'} justify-end w-full absolute right-0 top-16 z-10`}
              >
                <div className="rounded-lg border flex justify-center items-center bg-white w-96 flex-grow lg:flex-grow-0 text-gray-900 h-28">
                  <Triangle color="#000000" height={80} width={80} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
