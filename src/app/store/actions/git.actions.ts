import { createAction, props } from '@ngrx/store';
import { Repository } from 'src/app/models/repository.model';

export const retrieveGitRepositories = createAction(
  '[GIT] Retrieve git repositories list'
);
export const receiveGitRepositories = createAction(
  '[GIT] Receive git repositories',
  props<{ payload: Repository[] }>()
);
export const removeGitRepositories = createAction('[GIT] Remove list');

export const retrieveBuiltByUsers = createAction(
  '[GIT USERS] Retrieve built by users',
  props<{ usernames }>()
);

export const receiveBuiltByUsers = createAction(
  '[GIT USERS] Receive built by users',
  props<{ payload: any[] }>()
);

export const initSavedRepositoriesRequest = createAction(
  '[STORAGE INIT] Request init saved repos'
);

export const initSavedRepositoriesResponse = createAction(
  '[STORAGE INIT] Response init saved repos',
  props<{ payload: string[] }>()
);

export const saveGitRepositoryRequest = createAction(
  '[STORAGE SAVE] Request save repo',
  props<{ name }>()
);

export const saveGitRepositoryResponse = createAction(
  '[STORAGE SAVE] Response save repo',
  props<{ payload: string[] }>()
);

export const removeRepoFromSaved = createAction(
  '[REMOVE FROM SAVED] remove repo from saved',
  props<{ name }>()
);
