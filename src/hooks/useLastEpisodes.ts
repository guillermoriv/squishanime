import axios from 'axios';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context';

export default function useLastEpisodes(): void {
  const { lastEpisodes, setLastEpisodes } = useContext(GlobalContext);

  useEffect(() => {
    let mounted: boolean = true;

    async function fetchData(): Promise<void> {
      const { data } = await axios.get(`${process.env.REACT_APP_API}lastEpisodes`);
      if (mounted) {
        setLastEpisodes(data.lastEpisodes);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [lastEpisodes]);
}
