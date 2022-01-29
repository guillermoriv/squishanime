import React from 'react';
import { FaTheaterMasks } from 'react-icons/fa';
import { RiAncientGateFill } from 'react-icons/ri';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CardDirectory } from '../../components/CardDirectory';
import useDirectory, { Anime } from '../../hooks/useDirectory';

import useLastEpisodes from '../../hooks/useLastEpisodes';
import { LastEpisode } from '../../interfaces';

export const Home: React.FC = () => {
  const { lastEpisodes, loadingLastEpisodes } = useLastEpisodes();
  const { directory, loading: loadingLastAnimes } = useDirectory('1');

  return (
    <div className="h-full">
      <div>
        <div className="text-3xl flex items-center text-white py-2 px-4">
          <RiAncientGateFill size={50} className="mr-3" /> Ultimos episodios:
        </div>
        {!loadingLastEpisodes ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {lastEpisodes.map((item: LastEpisode, index: number) => {
              const { title, episode, id } = item;

              return (
                <div className="flex justify-center p-2" key={index}>
                  <div className="rounded-lg shadow-xl transition-all bg-white w-full hover:shadow-2xl hover:-translate-y-5">
                    <Link key={index} to={`/anime/${id}`}>
                      <div className="relative">
                        <img
                          className="rounded-t-lg w-full h-56 object-cover"
                          src={
                            item.image !== null
                              ? item.image
                              : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
                          }
                          alt=""
                        />
                        <span className="top-3 right-10 absolute text-white bg-stone-700 bg-opacity-70 px-3 py-1 rounded-lg">
                          {episode}
                        </span>
                      </div>
                    </Link>
                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-medium mb-2 truncate">{title}</h5>
                      <Link
                        to={`/ver/${id}-${episode}`}
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Ver capitulo
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center text-white p-2 h-full">
            <Triangle color="#FFFFFF" height={80} width={80} />
          </div>
        )}
      </div>

      <hr className="my-6 mx-auto border-gray-300 w-1/2" />

      <div>
        <div className="text-3xl flex justify-between text-white py-2 px-4">
          <div className="flex items-center ">
            <FaTheaterMasks size={50} className="mr-3" />
            Ultimos animes:
          </div>
          <div>
            <Link
              to="/directorio"
              className="p-4 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Ver más
            </Link>
          </div>
        </div>
        {!loadingLastAnimes ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {directory.map((item: Anime, index: number) => {
              return <CardDirectory key={index} item={item} />;
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center text-white p-2 h-full">
            <Triangle color="#FFFFFF" height={80} width={80} />
          </div>
        )}
      </div>
    </div>
  );
};
