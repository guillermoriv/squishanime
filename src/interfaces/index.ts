export interface LastEpisode {
  id: string;
  title: string;
  episode: string;
  servers: { url: string; name: string }[];
  image: string | null;
}

export interface AppState {
  lastEpisodes: LastEpisode[];
  setLastEpisodes: (value: LastEpisode[]) => void;
  loadingLastEpisodes: boolean;
  setLoadingLastEpisodes: (value: boolean) => void;
}
