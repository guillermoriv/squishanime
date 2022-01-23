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

export default function useDirectory(page: string): Anime[] {
  const [directory, setDirectory] = useState<Anime[]>([]);

  console.log(page);
  useEffect(() => {
    async function fetchDirectory() {
      const { data } = await axios.get(`${process.env.REACT_APP_API}allDirectory?page=${page}`);
      setDirectory(data.animes);
    }

    fetchDirectory();
  }, [page]);

  return directory;
}
