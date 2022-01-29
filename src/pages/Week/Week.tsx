import React from 'react';
import { FaTv } from 'react-icons/fa';

import { CardDay } from '../../components/CardDay';
import { daysOfWeek } from '../../utils/constants';

export const Week: React.FC = () => {
  return (
    <div className="h-full">
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
