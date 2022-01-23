import axios from 'axios';
import React, { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { FiDelete } from 'react-icons/fi';

interface Search {
  id: string;
  image: string;
  title: string;
  type: string;
}

export const Navbar: React.FC = () => {
  const [resultSearch, setResultSearch] = useState<Search[]>([]);
  const [canShow, setCanShow] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const ref: MutableRefObject<null | any> = useRef(null);

  function handleClickOutside(event: Event) {
    if (!ref.current.contains(event.target)) {
      setCanShow(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

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
    <nav
      className="
        relative
        w-full
        flex flex-wrap
        items-center
        justify-between
        py-4
      dark:bg-gray-800
      text-gray-500
      hover:text-gray-700
      focus:text-gray-700
        shadow-lg
        navbar navbar-expand-lg navbar-light
      "
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button
          className="
            navbar-toggler
            text-gray-500
            border-0
            hover:shadow-none hover:no-underline
            py-2
            px-2.5
            bg-transparent
            focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
          "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
          <Link
            className="
              flex
              sm:hidden
              items-center
              text-gray-900
              hover:text-gray-900
              focus:text-gray-900
              mt-2
              lg:mt-0
              mr-1
            "
            to="/"
          >
            <h2 className="text-2xl font-medium leading-tight text-white">
              Squish
              <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
                Anime
              </span>
            </h2>
          </Link>
          <ul className="navbar-nav flex flex-col sm:hidden pl-0 list-style-none mr-auto">
            <li className="nav-item p-2">
              <Link className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/directorio">
                Directorio
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" to="/">
                Programación semanal
              </Link>
            </li>
          </ul>
          <div className="relative flex w-full">
            <form onSubmit={(e) => e.preventDefault()} className="w-full">
              <div className="flex justify-end">
                <div className="mb-3 w-96 flex-grow lg:flex-grow-0 ">
                  <label htmlFor="search-input" className="form-label hidden">
                    Text input
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      onFocus={() => {
                        if (resultSearch.length > 0 || error) {
                          setCanShow(true);
                        }
                      }}
                      onChange={handleChange}
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
                  {error && (
                    <li className="px-6 py-2 border-b border-gray-200 w-full">No fueron encontrado resultados...</li>
                  )}
                </ul>
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
    </nav>
  );
};
