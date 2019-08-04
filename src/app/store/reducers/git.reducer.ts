import { Action, createReducer, on } from '@ngrx/store';
import { normalize, schema } from 'normalizr';
import _set from 'lodash/set';

import * as GitActions from '../actions/git.actions';
import {
  Repository,
  RepositoryNormalized
} from 'src/app/models/repository.model';
import { GitUser } from 'src/app/models/git-user.model';

const repositoryEntity = new schema.Entity('repositories', undefined, {
  idAttribute: 'name'
});

export interface GitState {
  repositories?: {
    result?: String[];
    entities?: { repositories?: RepositoryNormalized };
    list?: Repository[];
    loading?: boolean;
    saved?: {
      list?: String[];
      loading?: boolean;
    };
  };
  users: {
    list?: GitUser[];
    loading?: boolean;
  };
}

export const initialState: GitState = {
  repositories: {
    result: [],
    loading: false,
    entities: { repositories: {} },
    list: Array.from({ length: 5 }).fill(null),
    saved: {
      list: [],
      loading: false
    }
  },
  users: {
    list: [],
    loading: false
  }
};

const gitReducer = createReducer(
  initialState,
  on(GitActions.retrieveGitRepositories, state => ({
    ...state,
    repositories: { ...state.repositories, loading: true }
  })),
  on(GitActions.receiveGitRepositories, (state, { payload }) => ({
    ...state,
    repositories: {
      ...state.repositories,
      ...normalize(payload, [repositoryEntity]),
      list: payload,
      loading: false
    }
  })),
  on(GitActions.retrieveBuiltByUsers, state => ({
    ...state,
    users: { loading: true }
  })),
  on(GitActions.receiveBuiltByUsers, (state, { payload }) => ({
    ...state,
    users: { loading: false, list: payload }
  })),
  on(GitActions.saveGitRepositoryRequest, state => ({
    ...state,
    repositorie: {
      ...state.repositories,
      saved: {
        ...state.repositories.saved,
        loading: true
      }
    }
  })),
  on(GitActions.saveGitRepositoryResponse, (state, { payload }) => ({
    ...state,
    repositories: {
      ...state.repositories,
      saved: {
        list: payload,
        loading: false
      }
    }
  })),
  on(GitActions.initSavedRepositoriesRequest, state => state),
  on(GitActions.initSavedRepositoriesResponse, (state, { payload }) => ({
    ...state,
    repositories: {
      ...state.repositories,
      saved: {
        list: payload,
        loading: false
      }
    }
  }))
);

export function reducer(state: GitState | undefined, action: Action) {
  return gitReducer(state, action);
}

export default reducer;
