import React, { useState } from 'react';
import { BsCardList } from 'react-icons/bs';
import { Triangle } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';

import useEpisodes, { EpisodeList } from '../../hooks/useEpisodes';
import useMoreInfo from '../../hooks/useMoreInfo';

export const Anime: React.FC = () => {
  const [filter, setFilter] = useState<boolean>(false);
  const { id } = useParams();
  const { information, isLoading } = useMoreInfo(id!);
  const { list, isListLoading } = useEpisodes(id!);

  function RenderAnime(filter: boolean) {
    if (filter) {
      list.sort((itema: EpisodeList, itemb: EpisodeList) => itema.episode - itemb.episode);
    } else {
      list.sort((itema: EpisodeList, itemb: EpisodeList) => itemb.episode - itema.episode);
    }

    return list.map((item: EpisodeList, index: number) => {
      return (
        <li key={index} className="p-2 mb-2 rounded-md border-2">
          <Link to={`../${item.id}`} className="flex">
            Ver {information.title} - {item.episode}
          </Link>
        </li>
      );
    });
  }

  return (
    <>
      {!isLoading ? (
        <div className="text-white flex flex-col p-2">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-shrink-0 mb-5 sm:mb-0">
              <img src={information.poster} alt={information.title} className="rounded-md w-full shadow-lg" />
              <div className="text-center">
                {information.status === 'Finalizado' ? (
                  <span className="inline-block w-full px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-bl rounded-br shadow-md">
                    {information.status}
                  </span>
                ) : (
                  <span className="inline-block w-full px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded-bl rounded-br shadow-md">
                    {information.status}
                  </span>
                )}
              </div>
            </div>
            <div className="ml-3 flex-grow">
              <div className="text-3xl font-bold">{information.title}</div>
              <p className="my-5">{information.synopsis}</p>
              <ul className="flex mt-3 items-center overflow-auto">
                {information.genres.map((item: string, index: number) => {
                  return (
                    <li key={index} className="text-center p-3 text-xs mr-1 rounded-2xl shadow-md bg-slate-800">
                      {item}
                    </li>
                  );
                })}
              </ul>
              <div className="my-2">
                <div className="bg-slate-800 p-2 rounded-md text-center font-bold w-32">
                  Score: {information.rating}
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 h-80 p-5 bg-slate-700 rounded-lg overflow-auto">
            <div className="flex items-center justify-between">
              <span className="flex items-center mb-4 text-xl">
                <BsCardList className="mr-4" size={45} /> Episodios:
              </span>
              <div className="flex justify-center">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                    type="checkbox"
                    role="switch"
                    onChange={() => setFilter(!filter)}
                    id="flexSwitchCheckChecked"
                  />
                  <label className="form-check-label inline-block text-white" htmlFor="flexSwitchCheckChecked">
                    {filter && <span className="hidden sm:inline">Ordenar de mayor a menor</span>}
                    {!filter && <span className="hidden sm:inline">Ordenar de menor a mayor</span>}
                  </label>
                </div>
              </div>
            </div>
            <ul>
              {!isListLoading ? (
                RenderAnime(filter)
              ) : (
                <li className="justify-center flex">
                  <Triangle color="#FFFFFF" height={80} width={80} />
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-white flex justify-center items-center h-full">
          <Triangle color="#FFFFFF" height={80} width={80} />
        </div>
      )}
    </>
  );
};
