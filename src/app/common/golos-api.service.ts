import {Injectable} from '@angular/core';
import Tag from "../model/Tag";
import {Observable} from "rxjs/Observable";
import Post from "../model/Post";

@Injectable()
export class GolosApiService {

  constructor() {
    const username = 'youtarget5';
    const password = 'qwerty12345'; // master password
    const keys = golos.auth.getPrivateKeys(username, password, ['posting']);
    const wif = keys.posting;

    golos.config.set('websocket', 'wss://ws.testnet.golos.io');
    golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
  }

  savePost(post: Post) {

  }

  findTags(query): Observable<Tag[]> {
    return Observable.create(subscriber => {
      golos.api.getDiscussionsByCreated(query, (err, result) => {
        debugger;
        subscriber.next([]);
      });
    });
  }
}
