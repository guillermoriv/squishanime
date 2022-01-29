import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { Anime } from '../../hooks/useDirectory';
import { range } from '../../utils/utils';

export const CardDirectory: React.FC<{ item: Anime }> = ({ item }: { item: Anime }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [score, setScore] = useState<string>('');
  const [scoreList, setScoreList] = useState<number[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}getScore/${item.mal_id}`);

          setScore(data.score);
          setScoreList(range(1, data.score));
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
        }
      }, 5000);

      setTimer(timer);
    }

    fetchData();

    return () => {
      clearTimeout(timer!);
      setScore('');
      setScoreList([]);
      setIsLoading(false);
    };
  }, []);

  return (
    <Link className="flex justify-center m-3" to={`../anime/${item.id}`}>
      <div className="flex flex-col md:flex-row md:max-w-xl transition-all hover:shadow-2xl hover:-translate-y-5 rounded-lg bg-white shadow-lg">
        <img
          className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={`https://storage.googleapis.com/squishanime_api/images/${item.poster}`}
        />
        <div className="p-6 flex flex-col justify-start">
          <h5 className="text-gray-900 text-xl font-medium mb-2">{item.title}</h5>
          <p className="text-gray-700 text-base mb-4">{item.description.slice(0, 200)}...</p>
          {!isLoading ? (
            <>
              {scoreList.length > 0 && (
                <ul className="flex">
                  {scoreList.map((_item, index) => {
                    return (
                      <li key={index}>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="star"
                          className="w-4 text-yellow-500 mr-1"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                          ></path>
                        </svg>
                      </li>
                    );
                  })}
                </ul>
              )}
              {score !== '' ? (
                <p className="text-gray-600 text-xs mt-3 font-bold">Score: {score}</p>
              ) : (
                <p className="text-gray-600 text-xs mt-3 font-bold">Score: No disponible </p>
              )}
            </>
          ) : (
            <div className="text-gray-600 text-xs font-bold flex items-center">
              Cargando...
              <div
                className="ml-2 spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full text-blue-300"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
