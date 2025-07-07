export interface Episode {
  id: number;
  name: string;
  episode: string;
  air_date: string;
}

export interface EpisodeState {
  only1: Episode[];
  shared: Episode[];
  only2: Episode[];
}