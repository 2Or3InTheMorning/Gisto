import { Injectable } from '@angular/core';
import { observable, action, computed } from 'mobx-angular';
import { set, get, keyBy, merge, map, includes } from 'lodash/fp';

@Injectable()
export class GistsStore {
  @observable ui = {
    loading: false
  };
  @observable gists = {};
  @observable staredGists = [];
  @observable current = {};
  @observable filter = '';

  @computed get currentGist () {
    return this.current;
  }

  @action setFilter(filter) {
    this.filter = filter;
  }

  proccessGist(gist) {
    gist.star = this.staredGists.indexOf(gist.id) !== -1;
    const regex = /#(\d*[A-Za-z_0-9]+\d*)/g;
    const description = gist.description;
    gist.tags = description.match(regex);
    gist.description = gist.tags ? gist.description.split(gist.tags[0])[0] : gist.description;
    gist.lastViewed = Math.floor(Date.now() / 1000);
    return gist;
  }

  @action setGists(gists) {
    gists.map(gist => {
      this.proccessGist(gist);
    });
    this.gists = keyBy('id', { ...gists });
  }

  @action setStarsOnGists(stared) {
    this.staredGists = stared.map(gist => gist.id);
  }

  @action setCurrentGist(result) {
    this.gists[result.id] = merge(this.gists[result.id], result);
    const gist = this.gists[result.id];
    this.proccessGist(gist);
    this.current = merge(this.gists[result.id], gist);
  }
}
