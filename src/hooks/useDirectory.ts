import axios from 'axios';
import { useState, useEffect } from 'react';

export interface Anime {
  id: string;
  title: string;
  mal_id: number;
  poster: string;
  type: string;
  genres: string[];
  score: string;
  source: string;
  description: string;
}

export default function useDirectory(page: string): { directory: Anime[]; loading: boolean } {
  const [directory, setDirectory] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchDirectory() {
      setIsLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}allDirectory?page=${page}`);
      setDirectory(data.animes);
      setIsLoading(false);
    }

    fetchDirectory();
  }, [page]);

  return { directory, loading: isLoading };
}
