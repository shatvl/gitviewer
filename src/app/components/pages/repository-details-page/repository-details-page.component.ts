import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Repository } from 'src/app/models/repository.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  selectGitRepositoryByName,
  selectGitUsersList,
  isRepoSaved
} from 'src/app/store/selectors/git.selectors';
import { ActivatedRoute } from '@angular/router';
import {
  retrieveBuiltByUsers,
  saveGitRepositoryRequest,
  removeRepoFromSaved
} from 'src/app/store/actions/git.actions';
import { GitUser } from 'src/app/models/git-user.model';

@Component({
  selector: 'app-repository-details-page',
  templateUrl: './repository-details-page.component.html',
  styleUrls: ['./repository-details-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryDetailsPageComponent implements OnInit {
  repository$: Observable<Repository>;
  builtByUsers$: Observable<GitUser[]>;
  isRepoSaved$: Observable<boolean>;

  constructor(private store: Store<any>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.builtByUsers$ = this.store.select(selectGitUsersList());
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.isRepoSaved$ = this.store.pipe(
          select(isRepoSaved(params['name']))
        );
        this.repository$ = this.store.select(
          selectGitRepositoryByName(params['name'])
        );
        this.repository$.subscribe(repository => {
          if (!repository) return;

          this.store.dispatch(
            retrieveBuiltByUsers({
              usernames: repository.builtBy.map(({ username }) => username)
            })
          );
        });
      }
    });
  }

  saveRepository() {
    this.repository$.subscribe(repository => {
      if (!repository) return;
      this.store.dispatch(saveGitRepositoryRequest({ name: repository.name }));
    });
  }

  removeRepository() {
    this.repository$.subscribe(repository => {
      if (!repository) return;
      this.store.dispatch(removeRepoFromSaved({ name: repository.name }));
    });
  }
}
