export interface LastEpisode {
  id: string;
  title: string;
  episode: string;
  servers: { url: string; name: string }[];
}

export interface AppState {
  lastEpisodes: LastEpisode[];
  setLastEpisodes: (value: LastEpisode[]) => void;
}
