import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTheaterMasks } from 'react-icons/fa';
import { Triangle } from 'react-loader-spinner';
import { Link, useParams } from 'react-router-dom';
import { CardDirectory } from '../../components/CardDirectory';
import useDirectory, { Anime } from '../../hooks/useDirectory';
import { fetchPageNumbers } from '../../utils/utils';

export const Directory: React.FC = () => {
  const { page: actuallyPage } = useParams();
  const page = actuallyPage ? actuallyPage : '1';
  const { directory, loading } = useDirectory(page);
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
    <div className="h-full">
      <div className="text-3xl flex items-center text-white py-2 px-4">
        <FaTheaterMasks size={50} className="mr-3" />
        Animes:
      </div>
      {!loading ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {directory.map((item: Anime, index: number) => {
              return <CardDirectory key={index} item={item} />;
            })}
          </div>
          <div className="p-3 flex justify-center w-full">
            <nav aria-label="Page navigation example">
              <ul className="flex list-style-none">
                <li className="page-item disabled">
                  <Link
                    className={`page-link relative hidden sm:block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                      Number(page) !== 1
                        ? 'text-white hover:text-gray-800 hover:bg-gray-200'
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
                          className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
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
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        to={`../directorio/${item}`}
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}

                <li className="page-item">
                  <Link
                    className={`page-link relative hidden sm:block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                      Number(page) !== numberOfPages
                        ? 'text-white hover:text-gray-800 hover:bg-gray-200'
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
        </>
      ) : (
        <>
          <div className="text-white flex justify-center items-center h-full">
            <Triangle color="#FFFFFF" height={80} width={80} />
          </div>
          <div className="p-3 flex justify-center w-full">
            <nav aria-label="Page navigation for squishanime">
              <ul className="flex list-style-none">
                <li className="page-item disabled">
                  <Link
                    className={`page-link relative hidden sm:block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                      Number(page) !== 1
                        ? 'text-white hover:text-gray-800 hover:bg-gray-200'
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
                          className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
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
                        className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                        to={`../directorio/${item}`}
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}

                <li className="page-item">
                  <Link
                    className={`page-link relative hidden sm:block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                      Number(page) !== numberOfPages
                        ? 'text-white hover:text-gray-800 hover:bg-gray-200'
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
        </>
      )}
    </div>
  );
};
