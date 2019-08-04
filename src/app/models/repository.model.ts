import { GitUserShortInfo } from './git-user.model';

export interface Repository {
  author?: string;
  avatar?: string;
  builtBy?: GitUserShortInfo[];
  content?: string;
  currentPeriodStars?: number;
  description?: string;
  forks?: number;
  language?: string;
  languageColor?: string;
  name?: string;
  stars?: number;
  url?: string;
}

export interface RepositoryNormalized {
  [name: string]: Repository;
}
