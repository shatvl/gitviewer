import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from 'src/app/models/repository.model';
import { Store, select } from '@ngrx/store';
import { selectSavedReposEntities } from 'src/app/store/selectors/git.selectors';

@Component({
  selector: 'app-saved-page',
  templateUrl: './saved-page.component.html',
  styleUrls: ['./saved-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedPageComponent implements OnInit {
  savedRepos$: Observable<Repository[]> = this.store.pipe(
    select(selectSavedReposEntities)
  );

  constructor(private store: Store<any>) {}

  ngOnInit() {}
}
