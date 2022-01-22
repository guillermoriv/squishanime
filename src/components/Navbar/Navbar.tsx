import axios from 'axios';
import React, { MutableRefObject, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

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
    <div className="bg-slate-800 text-white px-3 py-8 shadow-lg">
      <div className="flex w-full">
        <div className="ml-auto relative">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="p-2">
              <input
                type="text"
                placeholder="Buscar..."
                name="anime"
                onFocus={() => {
                  if (resultSearch.length > 0 || error) {
                    setCanShow(true);
                  }
                }}
                onChange={handleChange}
                className="rounded-md p-2 outline-none focus:border-2 focus:border-blue-400 text-black w-80"
              />
            </div>
          </form>
          {!isLoading ? (
            <ul
              ref={ref}
              className={`absolute bg-zinc-600 p-4 z-10 h-52 w-80 ${
                canShow ? 'block' : 'hidden'
              } rounded-md overflow-auto top-13 right-2`}
            >
              {resultSearch.map((item: Search, index: number) => {
                return (
                  <li className="mb-2" key={index}>
                    <Link to={`../anime/${item.id}`} className="flex justify-between">
                      <div className="flex flex-col w-52">
                        <span>{item.title}</span>
                        {item.type.toLowerCase() === 'anime' ? (
                          <span className="bg-green-500 text-xs p-1 rounded-lg w-16 text-center">{item.type}</span>
                        ) : (
                          <span className="bg-pink-600 text-xs p-1 rounded-lg w-16 text-center">{item.type}</span>
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
              {error && <li>No fueron encontrado resultados...</li>}
            </ul>
          ) : (
            <ul
              ref={ref}
              className={`absolute bg-zinc-600 p-4 z-10 ${
                canShow ? 'block' : 'hidden'
              } w-80 rounded-md overflow-auto top-13 right-2`}
            >
              <li className="flex justify-center">
                <Triangle color="#FFFFFF" height={80} width={80} />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
