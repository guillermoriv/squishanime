import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { LastEpisode } from '../../interfaces';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { lastEpisodes } = useContext(GlobalContext);

  return (
    <div className="p-8">
      <div className="text-3xl text-white p-3">Ultimos episodios:</div>
      <div className="flex flex-wrap">
        {lastEpisodes.map((item: LastEpisode, index: number) => {
          const { title, episode, id } = item;

          return (
            <div key={index} className="border-2 m-2 p-5 flex-grow text-white rounded-md">
              <span>
                {title} {episode}
              </span>
              <Link to={`/ver/${id}-${episode}`}>Ver capitulo</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
