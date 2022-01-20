import axios from 'axios';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context';

export default function useLastEpisodes(): void {
  const { lastEpisodes, setLastEpisodes, setLoadingLastEpisodes } = useContext(GlobalContext);

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
}
