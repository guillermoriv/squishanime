import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
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
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  async function handleChange(e: SyntheticEvent): Promise<void> {
    e.preventDefault();
    setResultSearch([]);
    const searchValue: string = (e.target as any).value;
    clearTimeout(timer!);

    if (searchValue.length >= 3) {
      setCanShow(true);
      setIsLoading(true);
      const newTimer = setTimeout(async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}search/${searchValue}`);
        setResultSearch(data.search);
        setIsLoading(false);
      }, 700);

      setTimer(newTimer);
    } else {
      setCanShow(false);
    }
  }

  return (
    <div className="bg-slate-800 text-white px-3 py-8 shadow-lg">
      <div className="flex items-center w-3/4 mx-auto">
        <div className="text-3xl font-bold">
          <Link to="/">SquishAnime</Link>
        </div>
        <div className="flex w-full">
          <ul className="flex items-center justify-center">
            <li className="mx-2">
              <Link to="/">Inicio</Link>
            </li>
            <li className="mx-2">
              <Link to="/">Animes</Link>
            </li>
            <li className="mx-2">
              <Link to="/">Programación Semanal</Link>
            </li>
          </ul>
          <div className="ml-auto relative">
            <form>
              <label htmlFor="navbar-search">
                <span className="hidden">Search for anime</span>
              </label>
              <input
                type="text"
                id="navbar-search"
                placeholder="Buscar..."
                name="anime"
                onChange={handleChange}
                className="rounded-md p-2 text-black w-60"
              />
            </form>
            {canShow ? (
              !isLoading ? (
                <ul className="absolute bg-zinc-600 p-4 z-10 h-52 w-72 rounded-md overflow-auto top-12">
                  {resultSearch.map((item: Search, index: number) => {
                    return (
                      <li className="mb-2">
                        <Link to={`../anime/${item.id}`} className="flex justify-between">
                          <div className="flex flex-col w-52">
                            <span>{item.title}</span>
                            {item.type.toLowerCase() === 'anime' ? (
                              <span className="bg-green-500 p-1 rounded-lg w-16 text-center">{item.type}</span>
                            ) : (
                              <span className="bg-pink-600 p-1 rounded-lg w-16 text-center">{item.type}</span>
                            )}
                          </div>
                          <img src={item.image} className="rounded-lg h-24" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <ul className="absolute bg-zinc-600 p-4 z-10 w-72 rounded-md overflow-auto top-12">
                  <li className="flex justify-center">
                    <Triangle color="#FFFFFF" height={80} width={80} />
                  </li>
                </ul>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
