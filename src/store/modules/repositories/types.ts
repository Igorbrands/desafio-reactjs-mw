export enum RepositoriesTypes {
  LOAD_REQUEST = '@repositories/LOAD_REQUEST',
  LOAD_SUCCCES = '@repositories/LOAD_SUCCCES',
  LOAD_FAILURE = '@repositories/LOAD_FAILURE',
}

export interface Repository {
  id: number;
  name: string;
  description: string;
}

export interface User {
  login: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
}

export interface RepositoriesState {
  readonly data: Repository[];
  readonly loading: boolean;
  readonly error: boolean;
}
