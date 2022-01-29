import { useEffect, useState } from 'react';

import axios from 'axios';

interface InfoAnime {
  title: string;
  poster: string;
  synopsis: string;
  status: string;
  type: string;
  genres: string[];
  moreInfo: any;
  source: string;
  totalEpisodes: number;
  rating: number;
  aired: { from: string | null; to: string | null };
  duration: string;
  rank: number;
  producers: string[];
  licensors: string[];
  studios: string[];
  related: { title: string | undefined; type: string | undefined; poster: string | undefined }[];
}

export default function useMoreInfo(id: string): { information: InfoAnime; isLoading: boolean } {
  const [information, setInformation] = useState<InfoAnime>({
    title: '',
    poster: '',
    synopsis: '',
    status: '',
    type: '',
    genres: [],
    moreInfo: {},
    source: '',
    totalEpisodes: 0,
    rating: 0,
    aired: { from: '', to: '' },
    duration: '',
    rank: 0,
    producers: [],
    licensors: [],
    studios: [],
    related: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMoreInfo(): Promise<void> {
      setIsLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}moreInfo/${id}`);
      setInformation({ ...data, totalEpisodes: data.moreInfo.totalEpisodes });
      setIsLoading(false);
    }

    fetchMoreInfo();
  }, [id]);

  return { information, isLoading };
}
