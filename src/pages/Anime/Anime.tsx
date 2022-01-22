import React, { useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
import useEpisodes, { EpisodeList } from '../../hooks/useEpisodes';
import useMoreInfo from '../../hooks/useMoreInfo';

export const Anime: React.FC = () => {
  const [filter, setFilter] = useState<boolean>(false);
  const { id } = useParams();
  const { information, isLoading } = useMoreInfo(id!);
  const { list } = useEpisodes(id!);

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
          <div className="flex">
            <img src={information.poster} alt={information.title} className="rounded-md h-80 shadow-lg" />
            <div className="flex-grow ml-3">
              <div className="text-3xl font-bold">{information.title}</div>
              <p>{information.synopsis}</p>
              <ul className="flex mt-3">
                {information.genres.map((item: string, index: number) => {
                  return (
                    <li key={index} className="text-center p-2 text-xs mr-1 rounded-2xl shadow-md bg-slate-800">
                      {item}
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center my-2 justify-between">
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
                      {filter && <span>Ordenar de mayor a menor</span>}
                      {!filter && <span>Ordenar de menor a mayor</span>}
                    </label>
                  </div>
                </div>
                <div className="bg-slate-800 p-2 rounded-md text-center font-bold w-32">
                  Score: {information.rating}
                </div>
              </div>
            </div>
          </div>
          <ul className="ml-60 h-72 overflow-auto">{RenderAnime(filter)}</ul>
        </div>
      ) : (
        <div className="text-white flex justify-center items-center h-full">
          <Triangle color="#FFFFFF" height={80} width={80} />
        </div>
      )}
    </>
  );
};
