import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { LastEpisode } from '../../interfaces';
import { Link } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import { RiAncientGateFill } from 'react-icons/ri';

export const Home: React.FC = () => {
  const { lastEpisodes, loadingLastEpisodes } = useContext(GlobalContext);

  return (
    <div>
      <div className="text-3xl flex items-center text-white py-2 px-4">
        <RiAncientGateFill className="mr-3" /> Ultimos episodios:
      </div>
      {!loadingLastEpisodes ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {lastEpisodes.map((item: LastEpisode, index: number) => {
            const { title, episode, id } = item;

            return (
              <Link key={index} className="mb-2 mx-1 p-2" to={`/ver/${id}-${episode}`}>
                <div className="relative m-2 h-52 w-60 shadow-xl text-white">
                  <img
                    src={
                      item.image !== null
                        ? item.image
                        : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
                    }
                    className="h-full rounded-lg w-full"
                    alt="Anime Image"
                  />
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
        <div className="flex justify-center items-center text-white p-2">
          <Triangle color="#FFFFFF" height={80} width={80} />
        </div>
      )}
    </div>
  );
};
