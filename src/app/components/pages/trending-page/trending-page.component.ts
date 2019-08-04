import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Repository } from 'src/app/models/repository.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectGitList } from '../../../store/selectors/git.selectors';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  styleUrls: ['./trending-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendingPageComponent {
  repositories$: Observable<Repository[]> = this.store.pipe(
    select(selectGitList())
  );

  constructor(private store: Store<any>) {}
}
