import { useEffect, useState } from 'react';

import axios from 'axios';

export interface Genre {
  name: string;
  value: string;
}

export default function useGenres(): { genres: Genre[]; loading: boolean } {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchDirectory() {
      setIsLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}genres`);
      setGenres(data.genres);
      setIsLoading(false);
    }

    fetchDirectory();
  }, []);

  return { genres, loading: isLoading };
}
