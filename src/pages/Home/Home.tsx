import React from 'react';
import { Helmet } from 'react-helmet';
import { FaArrowRight, FaComment, FaEye, FaTheaterMasks } from 'react-icons/fa';
import { RiAncientGateFill } from 'react-icons/ri';
import { Triangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import useDirectory, { Anime } from '../../hooks/useDirectory';
import useLastEpisodes from '../../hooks/useLastEpisodes';
import { LastEpisode } from '../../interfaces';

import './index.scss';

export const Home: React.FC = () => {
  const { lastEpisodes, loadingLastEpisodes } = useLastEpisodes();
  const { directory, loading: loadingLastAnimes } = useDirectory('1');

  return (
    <div className="mt-8">
      <Helmet>
        <title>SquishAnime - tu sitio de anime online!</title>
        <meta name="description" content="El mejor sitio web para ver anime!, disfrutalo!" />

        <meta itemProp="name" content="SquishAnime - tu sitio de anime online!" />
        <meta itemProp="description" content="El mejor sitio web para ver anime!, disfrutalo!" />
        <meta itemProp="image" content="" />

        <meta property="og:url" content="https://squishanime.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SquishAnime - tu sitio de anime online!" />
        <meta property="og:description" content="El mejor sitio web para ver anime!, disfrutalo!" />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SquishAnime - tu sitio de anime online!" />
        <meta name="twitter:description" content="El mejor sitio web para ver anime!, disfrutalo!" />
        <meta name="twitter:image" content="" />
      </Helmet>
      {!loadingLastAnimes ? (
        <div id="carouselExampleCaptions" className="carousel slide relative" data-bs-ride="carousel">
          <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner relative rounded-lg w-full overflow-hidden">
            {directory.slice(0, 3).map((item: Anime, index: number) => {
              const { title, description, genres, poster, id } = item;

              return (
                <div className={`carousel-item ${index === 0 ? 'active' : ''} relative float-left w-full`} key={index}>
                  <div
                    style={{
                      backgroundImage: `url("${
                        poster !== null
                          ? `https://storage.googleapis.com/squishanime_api/images/${poster}`
                          : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
                      }")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    className="w-full h-96"
                  />

                  <div className="watch-caption">
                    {genres.map((genre: string, index: number) => (
                      <div key={index} className="watch-caption__text-genre">
                        {genre}
                      </div>
                    ))}
                    <h2 className="watch-caption__text-title">{title}</h2>
                    <p className="watch-caption__text-desc truncate">{description}</p>
                    <Link to={`/anime/${id}`}>
                      <span className="watch-caption__button">ver anime</span>
                      <span className="watch-caption__button-icon">&gt;</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev carousel-button next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="font-bold">&lt;</span>
          </button>
          <button
            className="carousel-control-next carousel-button prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="font-bold">&gt;</span>
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center text-white p-2 h-full">
          <Triangle color="#FFFFFF" height={80} width={80} />
        </div>
      )}

      <div className="flex flex-col xl:flex-row">
        <div className="trending-product">
          <div className="flex items-center flex-wrap">
            <div className="trending-title flex-auto">
              <RiAncientGateFill size={50} className="mr-3" /> Tendencias
            </div>
            <Link to="/directorio" className="text-white uppercase font-bold tracking-wider flex items-center">
              <span>Ver todos</span>
              <FaArrowRight size={17} className="ml-3" />
            </Link>
          </div>
          {!loadingLastEpisodes ? (
            <div className="flex flex-wrap">
              {lastEpisodes.slice(0, 12).map((item: LastEpisode, index: number) => {
                const { title, episode, genres, id } = item;

                return (
                  <div className="trending-item" key={index}>
                    <Link className="p-2" to={`/ver/${id}-${episode}`}>
                      <div
                        className="rounded-lg transition-all w-full h-96"
                        style={{
                          backgroundImage: `url("${
                            item.image !== null
                              ? item.image!
                              : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
                          }")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="relative">
                          <span className="top-3 left-5 absolute text-white bg-[#e53637] px-3 py-0.5 rounded-md">
                            {episode} / ?
                          </span>
                        </div>
                        <div className="relative">
                          <span className="top-80 left-10 absolute text-white flex items-center bg-[#3d3d3d] px-3 py-0.5 rounded-md">
                            <FaComment className="mr-1" />
                            11
                          </span>
                        </div>
                        <div className="relative">
                          <span className="top-80 right-10 absolute text-white flex items-center bg-[#3d3d3d] px-3 py-0.5 rounded-md">
                            <FaEye className="mr-1" />
                            9141
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="p-2">
                      <ul className="text-white flex">
                        {genres.slice(0, 3).map((genre: string, index: number) => (
                          <li className="genre" key={index}>
                            {genre}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2">
                      <h5 className="text-white text-xl font-medium mb-2 truncate">{title}</h5>
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

        <div className="flex flex-col basis-1/3">
          <div className="top-view">
            <div className="flex items-center flex-wrap">
              <div className="top-title flex-auto">
                <FaTheaterMasks size={50} className="mr-3" />
                Top views
              </div>
            </div>
            {!loadingLastAnimes ? (
              <div className="flex flex-wrap">
                {directory.slice(0, 6).map((item: Anime, index: number) => {
                  const { title, id, poster } = item;

                  return (
                    <div className="top-item" key={index}>
                      <Link className="p-2" to={`/anime/${id}`}>
                        <div
                          className="rounded-lg transition-all w-full h-52"
                          style={{
                            backgroundImage: `url("${
                              poster !== null
                                ? `https://storage.googleapis.com/squishanime_api/images/${poster}`
                                : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
                            }")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <div className="relative">
                            <span className="top-3 right-5 absolute text-white flex items-center bg-[#3d3d3d] px-3 py-0.5 rounded-md">
                              <FaEye className="mr-1" />
                              9141
                            </span>
                          </div>
                          <div className="relative">
                            <h5 className="top-36 w-52 xl:w-full left-5 absolute text-white text-xl font-medium mb-2 truncate">
                              {title}
                            </h5>
                          </div>
                        </div>
                      </Link>
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
        </div>
      </div>
    </div>
  );
};
