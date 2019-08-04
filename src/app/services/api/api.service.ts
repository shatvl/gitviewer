import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(url: string, params: object = {}): Observable<any> {
    return this.request('get', url, params);
  }

  post(url: string, body: object): Observable<any> {
    return this.request('post', url, {}, body);
  }

  put(url: string, body: object): Observable<any> {
    return this.request('put', url, {}, body);
  }

  delete(url: string, body: object): Observable<any> {
    return this.request('delete', url, {}, body);
  }

  request(
    method: string,
    url: string,
    params: object = {},
    body: object = {}
  ): Observable<any> {
    const httpOptions = this.getHttpParams(body, params);

    return this.http.request(method, url, httpOptions);
  }

  private getHttpParams(body: object, params: object) {
    let parameters = Object.keys(params).reduce(
      (httpParams, param) => httpParams.set(param, params[param]),
      new HttpParams()
    );
    return { body, params: parameters };
  }
}

export interface ApiResponse<T> {
  payload?: T;
}
