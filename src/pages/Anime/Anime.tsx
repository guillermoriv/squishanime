import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useEpisodes, { EpisodeList } from '../../hooks/useEpisodes';
import useMoreInfo from '../../hooks/useMoreInfo';

export const Anime: React.FC = () => {
  const { id } = useParams();
  const { information, isLoading } = useMoreInfo(id!);
  const { list, isLoading: isEpisodeLoading } = useEpisodes(id!);

  return (
    <div className="w-3/4 mx-auto">
      {!isLoading ? (
        <div className="text-white flex flex-col p-2">
          <div className="flex">
            <img src={information.poster} alt={information.title} className="rounded-md h-80" />
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
              <div className="bg-slate-800 p-2 rounded-md text-center font-bold w-32 mt-2 ml-auto">
                Score: {information.rating}
              </div>
            </div>
          </div>
          <ul className="ml-60 h-72 overflow-auto">
            {list.map((item: EpisodeList, index: number) => {
              return (
                <li key={index} className="p-2 mb-2 rounded-md border-2">
                  <Link to={`../${item.id}`} className="flex">
                    Ver {information.title} - {item.episode}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="text-white">Cargando...</div>
      )}
    </div>
  );
};
