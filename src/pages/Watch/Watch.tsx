import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useServers from '../../hooks/useServers';
import { getNextEpisode, getPreviousEpisode } from '../../utils/utils';

export const Watch: React.FC = () => {
  const { id } = useParams();
  const serverList = useServers(id);
  const [serverLink, setServerLink] = useState<string>(serverList.defaultServerUrl);

  useEffect(() => {
    setServerLink(serverList.defaultServerUrl);
  }, [serverList.defaultServerUrl]);

  return (
    <div className="p-6 flex flex-col items-center justify-between w-1/2 m-auto">
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
      <div className="w-full">
        <Link to={`../ver/${getPreviousEpisode(id)}`}>Capitulo anterior</Link>
        <Link to={`../ver/${getNextEpisode(id)}`}>Siguiente capitulo</Link>
      </div>
    </div>
  );
};
