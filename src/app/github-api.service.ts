import {Injectable} from '@angular/core';
import {GistsStore} from './store/gists';

@Injectable()
export class GithubApiService {

  private baseUrl = 'https://api.github.com/gists';
  private headers = new Headers();
  private token = localStorage.getItem('api-token');

  constructor(private gistsStore: GistsStore) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', `token ${this.token}`);
  }

  getGists(page = 1) {
    return fetch(`${this.baseUrl}?page=${page}`, {headers: this.headers})
      .then(response => {
        if (response.headers.get('Link').match(/next/ig)) {
          this.getGists(page + 1);
        }
        return response.json();
      })
      .then(results => {
        return this.gistsStore.setGists(results);
      });
  }

  getStaredGists() {
    return fetch(`${this.baseUrl}/starred`, {headers: this.headers})
      .then(response => response.json())
      .then(results => this.gistsStore.setStarsOnGists(results));
  }

  getGist(id) {
    return fetch(`${this.baseUrl}/${id}`, {headers: this.headers})
      .then(response => response.json())
      .then(result => this.gistsStore.setCurrentGist(result));
  }
}
