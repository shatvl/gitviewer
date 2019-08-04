import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { GitService } from '../../services/git/git.service';
import * as GitActions from '../actions/git.actions';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable()
export class GitEffects {
  constructor(
    private actions$: Actions,
    private gitService: GitService,
    private storageService: StorageService
  ) {}

  loadGitRepositories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GitActions.retrieveGitRepositories.type),
      mergeMap(() =>
        this.gitService.getRepositories().pipe(
          map(repositories => ({
            type: GitActions.receiveGitRepositories.type,
            payload: repositories
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadGitUserShortInfos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GitActions.retrieveBuiltByUsers.type),
      mergeMap(({ usernames }) =>
        this.gitService.getGitUserShortInfosByNames(usernames).pipe(
          map(users => ({
            type: GitActions.receiveBuiltByUsers.type,
            payload: users
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  saveGitRepository$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GitActions.saveGitRepositoryRequest.type),
      mergeMap(({ name }) =>
        this.storageService.saveRepository(name).pipe(
          map(savedRepos => ({
            type: GitActions.saveGitRepositoryResponse.type,
            payload: savedRepos
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  initGitSavedRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GitActions.initSavedRepositoriesRequest.type),
      mergeMap(() =>
        this.storageService.getSavedRepositories$().pipe(
          map(savedRepos => ({
            type: GitActions.initSavedRepositoriesResponse.type,
            payload: savedRepos
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  removeRepoFromSaved$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GitActions.removeRepoFromSaved.type),
      mergeMap(({ name }) =>
        this.storageService.removeRepoFromStorage(name).pipe(
          map(() => ({
            type: GitActions.initSavedRepositoriesRequest.type
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
