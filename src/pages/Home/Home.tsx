import React, { useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context';
import { LastEpisode } from '../../interfaces';

export const Home: React.FC = () => {
  const { lastEpisodes } = useContext(GlobalContext);

  return (
    <div className="bg-slate-600">
      <div>Ultimos episodios:</div>
      {lastEpisodes.map((item: LastEpisode, index: number) => {
        return (
          <div key={index}>
            <span>{item.title}</span>
            <span>{item.episode}</span>
          </div>
        );
      })}
    </div>
  );
};
