import {Injectable} from '@angular/core';
import Tag from "../model/Tag";
import {Observable} from "rxjs/Observable";
import Post from "../model/Post";
import {GolosSettings} from "./golos-settings";

@Injectable()
export class GolosApiService {
  constructor() {
    golos.config.set('websocket', 'wss://ws.testnet.golos.io');
    golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
  }

  savePost(post: Post) {
    return Observable.create(subscriber => {
      const keys = golos.auth.getPrivateKeys(
        GolosSettings.username,
        GolosSettings.password,
        ['posting']);
      const wif = keys.posting;
      debugger;
      golos.broadcast.comment(wif,
        post.parentAuthor,
        post.parentPermlink,
        post.author,
        post.permlink,
        post.title,
        post.body,
        post.jsonMetadata,
        function (err, result) {
          debugger;
          if (!err) {
            console.log('golos-api-service:error:', result);
            return subscriber.next(result);
          }
          console.log('golos-api-service:error:', err);
          subscriber.error(err);
        });
    });
  }

  findTags(query): Observable<Tag[]> {
    return Observable.create(subscriber => {
      golos.api.getDiscussionsByCreated(query, (err, result) => {
        if (!result || !result.length) {
          subscriber.next([
            {"id": 1, "itemName": "India"},
            {"id": 2, "itemName": "Singapore"},
            {"id": 3, "itemName": "Australia"},
            {"id": 4, "itemName": "Canada"},
            {"id": 5, "itemName": "South Korea"},
            {"id": 6, "itemName": "Germany"},
            {"id": 7, "itemName": "France"},
            {"id": 8, "itemName": "Russia"},
            {"id": 9, "itemName": "Italy"},
            {"id": 10, "itemName": "Sweden"}
          ])
        } else {
          subscriber.next([]);
        }
      });
    });
  }
}
