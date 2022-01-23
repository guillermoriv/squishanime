import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDirectory, { Anime } from '../../hooks/useDirectory';
import { fetchPageNumbers } from '../../utils/utils';

export const Directory: React.FC = () => {
  const { page: actuallyPage } = useParams();
  const page = actuallyPage ? actuallyPage : '1';
  const directory = useDirectory(page);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${process.env.REACT_APP_API}directoryCount`);
      setNumberOfPages(Math.floor(data.directoryCount / 25));
    }

    fetchData();
  }, []);

  const pages = fetchPageNumbers(page ? Number(page) : 1, numberOfPages);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
        {directory.map((item: Anime, index: number) => {
          return (
            <Link key={index} className="flex justify-center m-3" to={`../anime/${item.id}`}>
              <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                <img
                  className="w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                  src={`https://storage.googleapis.com/squishanime_api/images/${item.poster}`}
                />
                <div className="p-6 flex flex-col justify-start">
                  <h5 className="text-gray-900 text-xl font-medium mb-2">{item.title}</h5>
                  <p className="text-gray-700 text-base mb-4">
                    This is a wider card with supporting text below as a natural lead-in to additional content. This
                    content is a little bit longer.
                  </p>
                  <p className="text-gray-600 text-xs">Fecha</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="p-3 flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            <li className="page-item disabled">
              <Link
                className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                  Number(page) !== 1
                    ? 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
                    : 'text-gray-500 pointer-events-none'
                }  focus:shadow-none`}
                to={`../directorio/${Number(page) - 1}`}
              >
                Previous
              </Link>
            </li>
            {pages.map((item, index) => {
              if (item === 'DOTS') {
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                      href="#"
                    >
                      ...
                    </a>
                  </li>
                );
              }

              if (item === Number(page)) {
                return (
                  <li className="page-item active" key={index}>
                    <Link
                      className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
                      to={`../directorio/${item}`}
                    >
                      {item} <span className="visually-hidden">(current)</span>
                    </Link>
                  </li>
                );
              }

              return (
                <li className="page-item" key={index}>
                  <Link
                    className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                    to={`../directorio/${item}`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}

            <li className="page-item">
              <Link
                className={`page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                  Number(page) !== numberOfPages
                    ? 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
                    : 'text-gray-500 pointer-events-none'
                } focus:shadow-none`}
                to={`../directorio/${Number(page) + 1}`}
              >
                Next
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
