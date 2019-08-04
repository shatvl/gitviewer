import { createSelector } from '@ngrx/store';
import _get from 'lodash/get';

import { GitState } from '../reducers/git.reducer';

export interface AppState {
  git: object;
}

export const selectGit = (state: AppState) => state.git;

export const selectGitList = () =>
  createSelector(
    selectGit,
    (state: GitState) => state.repositories.list
  );

export const selectGitRepoEntities = () =>
  createSelector(
    selectGit,
    (state: GitState) =>
      state.repositories.entities
        ? state.repositories.entities.repositories
        : {}
  );

export const selectGitRepositoriesLoading = () =>
  createSelector(
    selectGit,
    (state: GitState) => state.repositories.loading
  );

export const selectGitRepositoryByName = name =>
  createSelector(
    selectGitRepoEntities(),
    repositories => repositories[name]
  );

export const selectGitUsers = createSelector(
  selectGit,
  (state: GitState) => state.users
);

export const selectSavedRepos = createSelector(
  selectGit,
  (state: GitState) => state.repositories.saved.list || []
);

export const selectSavedReposEntities = createSelector(
  selectSavedRepos,
  selectGitRepoEntities(),
  (savedRepoNames, repoEntities) => {
    console.log(savedRepoNames, repoEntities);
    return savedRepoNames.map(name => _get(repoEntities, name));
  }
);

export const selectSavedReposCount = createSelector(
  selectGit,
  (state: GitState) => (state.repositories.saved.list || []).length
);

export const isRepoSaved = name =>
  createSelector(
    selectSavedRepos,
    savedRepos => savedRepos.includes(name)
  );

export const selectGitUsersList = () =>
  createSelector(
    selectGitUsers,
    users => users.list
  );

export const selectGitUsersLoading = () =>
  createSelector(
    selectGitUsers,
    users => users.loading
  );
