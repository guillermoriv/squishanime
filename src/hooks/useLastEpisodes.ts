import axios from 'axios';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context';

export default function useLastEpisodes(): void {
  const { lastEpisodes, setLastEpisodes } = useContext(GlobalContext);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchLastEpisodes(): Promise<void> {
      const { data } = await axios.get(`${process.env.REACT_APP_API}lastEpisodes`, {
        signal: abortController.signal,
      });

      if (!abortController.signal.aborted) {
        setLastEpisodes(data.lastEpisodes);
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
