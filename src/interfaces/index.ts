export interface LastEpisode {
  id: string;
  title: string;
  episode: string;
  image: string | null;
}

export interface AppState {
  lastEpisodes: LastEpisode[];
  setLastEpisodes: (value: LastEpisode[]) => void;
  loadingLastEpisodes: boolean;
  setLoadingLastEpisodes: (value: boolean) => void;
}
