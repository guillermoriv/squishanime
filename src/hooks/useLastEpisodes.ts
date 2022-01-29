import { useEffect, useState } from 'react';

import axios from 'axios';

import { LastEpisode } from '../interfaces';

export default function useLastEpisodes(): { lastEpisodes: LastEpisode[]; loadingLastEpisodes: boolean } {
  const [lastEpisodes, setLastEpisodes] = useState<LastEpisode[]>([]);
  const [loadingLastEpisodes, setLoadingLastEpisodes] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchLastEpisodes(): Promise<void> {
      setLoadingLastEpisodes(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}lastEpisodes`, {
        signal: abortController.signal,
      });

      if (!abortController.signal.aborted) {
        setLastEpisodes(data.lastEpisodes);
        setLoadingLastEpisodes(false);
      }
    }

    if (lastEpisodes.length === 0) {
      fetchLastEpisodes();
    }

    return () => {
      abortController.abort();
    };
  }, [lastEpisodes, setLastEpisodes]);

  return { lastEpisodes, loadingLastEpisodes };
}
