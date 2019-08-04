import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  retrieveGitRepositories,
  initSavedRepositoriesRequest
} from './store/actions/git.actions';
import { Observable } from 'rxjs';
import { selectSavedReposCount } from './store/selectors/git.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'joinmytriptest';
  savedCount$: Observable<Number>;

  constructor(private store: Store<any>) {
    this.savedCount$ = this.store.pipe(select(selectSavedReposCount));
  }

  ngOnInit() {
    this.store.dispatch(retrieveGitRepositories());
    this.store.dispatch(initSavedRepositoriesRequest());
  }
}
