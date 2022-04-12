import React from 'react';
import { FaComment, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Anime } from '../../hooks/useDirectory';

import './index.scss';

export const CardDirectory: React.FC<{ item: Anime }> = ({ item }) => {
  return (
    <div className="card-directory">
      <Link className="card-directory__item" to={`../anime/${item.id}`}>
        <div
          className="rounded-lg transition-all w-full h-96"
          style={{
            backgroundImage: `url("${
              item.poster !== null
                ? `https://storage.googleapis.com/squishanime_api/images/${item.poster}`
                : 'https://storage.googleapis.com/squishanime_api/images/not_found.jpg'
            }")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
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
        <div className="p-2">
          <ul className="text-white flex">
            {item.genres.slice(0, 2).map((genre: string, index: number) => (
              <li className="card-directory__item-genre" key={index}>
                {genre}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-2">
          <h5 className="text-white text-xl font-medium mb-2 truncate">{item.title}</h5>
        </div>
      </Link>
    </div>
  );
};
