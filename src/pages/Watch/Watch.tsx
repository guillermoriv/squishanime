import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServers from '../../hooks/useServers';
import { getAnimeLink, getEpisodeNumber, getNextEpisode, getPreviousEpisode } from '../../utils/utils';
import { FaArrowRight, FaArrowLeft, FaHamburger } from 'react-icons/fa';
import useMoreInfo from '../../hooks/useMoreInfo';

export const Watch: React.FC = () => {
  const { id } = useParams();
  const serverList = useServers(id);
  const { information } = useMoreInfo(getAnimeLink(id));
  const [serverLink, setServerLink] = useState<string>(serverList.defaultServerUrl);

  useEffect(() => {
    setServerLink(serverList.defaultServerUrl);
  }, [serverList.defaultServerUrl]);

  return (
    <div className="p-6 flex flex-col items-center justify-between w-1/2 m-auto">
      <div className="text-white text-3xl">
        {information.title} - {getEpisodeNumber(id)}
      </div>
      <div className="flex justify-start w-full">
        <ul className="flex text-white my-2">
          {serverList.servers.map((item: { url: string; name: string }, index: number) => {
            const { name, url } = item;

            return (
              <li
                key={index}
                className="rounded-md border-2 p-2 cursor-pointer mx-1"
                onClick={() => setServerLink(url)}
              >
                {name}
              </li>
            );
          })}
        </ul>
      </div>
      <iframe scrolling="no" src={serverLink} allowFullScreen height={500} className="w-full" />
      <div className="mx-auto flex">
        {getEpisodeNumber(id) > 1 && (
          <Link to={`../ver/${getPreviousEpisode(id)}`} className="p-2">
            <FaArrowLeft color="#FFFFFF" className="text-3xl" />
          </Link>
        )}{' '}
        <Link to={`../anime/${getAnimeLink(id)}`} className="p-2">
          <FaHamburger color="#FFFFFF" className="text-3xl" />
        </Link>
        {getEpisodeNumber(id) + 1 <= information.totalEpisodes && (
          <Link to={`../ver/${getNextEpisode(id)}`} className="p-2">
            <FaArrowRight color="#FFFFFF" className="text-3xl" />
          </Link>
        )}
      </div>
    </div>
  );
};
