import axios from 'axios';
import React, { useEffect, useState } from 'react';

export interface EpisodeList {
  episode: number;
  id: string;
}

export default function useEpisodes(id: string): { list: EpisodeList[]; isLoading: boolean } {
  const [list, setList] = useState<EpisodeList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchEpisodes(): Promise<void> {
      setIsLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}getEpisodes/${id}`);
      setList(data.episodes);
      setIsLoading(false);
    }

    fetchEpisodes();
  }, [id]);

  return { isLoading, list };
}
