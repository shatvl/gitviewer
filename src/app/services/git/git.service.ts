import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from '../api/api.service';
import {
  GET_GIT_REPOSITORIES_URL,
  GET_GIT_USER_URL
} from 'src/app/constants/external-api';
import { Repository } from 'src/app/models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class GitService {
  constructor(private apiService: ApiService) {}

  public getRepositories(): Observable<Repository[]> {
    return this.apiService.get(GET_GIT_REPOSITORIES_URL);
  }

  public getGitUserShortInfosByNames(names: String[]): Observable<any> {
    return forkJoin(
      ...names.map(name => this.apiService.get(GET_GIT_USER_URL + name))
    );
  }
}
