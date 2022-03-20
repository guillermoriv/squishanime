import React from 'react';
import { Helmet } from 'react-helmet';
import { FaTv } from 'react-icons/fa';

import { CardDay } from '../../components/CardDay';
import { daysOfWeek } from '../../utils/constants';

export const Week: React.FC = () => {
  return (
    <div className="h-full">
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
      <div className="text-3xl flex items-center text-white py-2 px-4">
        <FaTv size={50} className="mr-3" />
        Programación:
      </div>
      <div className="p-3">
        {daysOfWeek.map((item: string, index: number) => {
          return <CardDay day={item} key={index} />;
        })}
      </div>
    </div>
  );
};
