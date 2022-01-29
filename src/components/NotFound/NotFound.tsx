import React from 'react';
import { Link } from 'react-router-dom';

import NotFoundPng from '../../assets/notfound.png';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center">
      <img src={NotFoundPng} alt="" />
      <div className="mt-20 text-white">
        <span>Vuelve al inicio, creo que estás en el lugar incorrecto...</span>
        <div className="flex space-x-2 justify-center">
          <Link
            className="inline-block mt-10 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            to="/"
          >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
