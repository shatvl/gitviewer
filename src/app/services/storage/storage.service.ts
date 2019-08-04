import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Repository } from 'src/app/models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private REPOSITORIES_KEY = 'GV_REPOSITORIES//';

  constructor() {}

  saveRepository(name: string): Observable<String[]> {
    try {
      const data = new Set(this.getSavedRepositories()).add(name);

      window.localStorage.setItem(
        this.REPOSITORIES_KEY,
        JSON.stringify(Array.from(data))
      );

      return from([Array.from(data.values())]);
    } catch (error) {
      console.error(error);
      return from([]);
    }
  }

  removeRepoFromStorage(name: string): Observable<String[]> {
    try {
      const data = new Set(this.getSavedRepositories());
      data.delete(name);

      window.localStorage.setItem(
        this.REPOSITORIES_KEY,
        JSON.stringify(Array.from(data))
      );

      return from([Array.from(data.values())]);
    } catch (error) {
      console.error(error);
      return from([]);
    }
  }

  getSavedRepositories(): string[] {
    try {
      const savedRepos = JSON.parse(
        window.localStorage.getItem(this.REPOSITORIES_KEY)
      );

      return Array.isArray(savedRepos) ? savedRepos : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  getSavedRepositories$(): Observable<string[]> {
    return from([this.getSavedRepositories()]);
  }

  removeUntrendingFromStorage(
    trendingRepos: Repository[]
  ): Observable<Repository[]> {
    const savedRepos = this.getSavedRepositories();
    const filteredSavedRepos = trendingRepos
      .filter(({ name }) => savedRepos.includes(name))
      .map(repo => repo.name);

    try {
      window.localStorage.removeItem(this.REPOSITORIES_KEY);
      window.localStorage.setItem(
        this.REPOSITORIES_KEY,
        JSON.stringify(filteredSavedRepos)
      );

      return from([trendingRepos]);
    } catch (error) {
      return from([trendingRepos]);
    }
  }
}
