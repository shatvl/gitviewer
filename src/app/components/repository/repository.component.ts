import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { Repository } from 'src/app/models/repository.model';
import {
  selectGitRepositoriesLoading,
  isRepoSaved
} from '../../store/selectors/git.selectors';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  removeRepoFromSaved,
  saveGitRepositoryRequest
} from 'src/app/store/actions/git.actions';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryComponent implements OnInit {
  @Input('repository') repository: Repository;
  loading$: Observable<boolean> = this.store.pipe(
    select(selectGitRepositoriesLoading())
  );
  isSaved$: Observable<boolean>;

  constructor(private store: Store<{ git: { list: Repository[] } }>) {}

  ngOnInit() {
    if (this.repository) {
      this.isSaved$ = this.store.pipe(
        select(isRepoSaved(this.repository.name))
      );
    }
  }

  removeRepositoryFromSaved() {
    this.store.dispatch(removeRepoFromSaved({ name: this.repository.name }));
  }

  saveRepositoryToStorage() {
    this.store.dispatch(
      saveGitRepositoryRequest({ name: this.repository.name })
    );
  }
}
