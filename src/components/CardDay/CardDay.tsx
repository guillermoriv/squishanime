import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { weekSpanish } from '../../utils/constants';

export const CardDay: React.FC<{ day: string }> = ({ day }: { day: string }) => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleClick() {
    if (schedule.length === 0) {
      setIsLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}schedule/${day}`);
      setSchedule(data.day);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h6 className="text-base font-medium leading-tight p-2 text-gray-800 cursor-pointer" onClick={handleClick}>
        <span className="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">
          {weekSpanish[day]}
        </span>
      </h6>
      {schedule.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 border-2 rounded-md p-2" id={day}>
          {schedule.map((item, index) => {
            return (
              <Link to={`../anime/${item.id}`} className="cursor-pointer" key={index}>
                <div className="flex justify-center p-2">
                  <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                    <img
                      className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                      src={item.images.jpg.image_url}
                      alt=""
                    />
                    <div className="p-6 flex flex-col justify-start">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">{item.title}</h5>
                      <p className="text-gray-700 text-base mb-4">This is just for testing porpuses.</p>
                      <p className="text-gray-600 text-xs">Last updated 3 mins ago</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-white p-2 border-2 rounded-md flex items-center">
          {!isLoading ? 'Esperando a que presiones, para cargar el dia' : 'Cargando animes...'}
          <div
            className="spinner-border animate-spin inline-block ml-4 w-8 h-8 border-4 rounded-full text-blue-300"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};
