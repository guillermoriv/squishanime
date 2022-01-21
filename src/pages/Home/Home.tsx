import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { LastEpisode } from '../../interfaces';
import { Link } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';

export const Home: React.FC = () => {
  const { lastEpisodes, loadingLastEpisodes } = useContext(GlobalContext);

  return (
    <div className="w-3/4 mx-auto">
      <div className="text-3xl text-white p-2">Ultimos episodios:</div>
      {!loadingLastEpisodes ? (
        <div className="flex flex-wrap">
          {lastEpisodes.map((item: LastEpisode, index: number) => {
            const { title, episode, id } = item;

            return (
              <Link key={index} className="flex-grow mb-2" to={`/ver/${id}-${episode}`}>
                <div className="border-2 relative m-2 h-52 w-52 text-white rounded-md">
                  <img src={item.image !== null ? item.image : ''} className="h-full w-full" alt="Anime Image" />
                  <span className="top-3 right-5 absolute bg-stone-700 bg-opacity-70 px-3 py-1 rounded-lg">
                    {episode}
                  </span>
                  <span className="block text-slate-400 truncate">{title}</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center text-white p-2">
          <Triangle color="#FFFFFF" height={80} width={80} />
        </div>
      )}
    </div>
  );
};
