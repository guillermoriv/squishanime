import { useEffect, useState } from 'react';

import axios from 'axios';

interface AnimeServers {
  id: string | undefined;
  servers: { url: string; name: string }[];
  defaultServerName: string;
  defaultServerUrl: string;
}

export default function useServers(id: string | undefined): AnimeServers {
  const [serverList, setServerList] = useState<AnimeServers>({
    id: '',
    servers: [],
    defaultServerName: '',
    defaultServerUrl: '',
  });

  useEffect(() => {
    async function fetchServers(): Promise<void> {
      const { data } = await axios.get(`${process.env.REACT_APP_API}getAnimeServers/ver/${id}`);

      setServerList({
        id,
        servers: data.servers,
        defaultServerName: data.servers[0].name,
        defaultServerUrl: data.servers[0].url,
      });
    }

    fetchServers();
  }, [id]);

  return serverList;
}
