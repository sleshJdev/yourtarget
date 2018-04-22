import {Injectable} from '@angular/core';
import Tag from "../model/Tag";
import {Observable} from "rxjs/Observable";
import Post from "../model/Post";
import {GolosSettings} from "./golos-settings";

@Injectable()
export class GolosApiService {
  wif: string;

  constructor() {
    golos.config.set('websocket', 'wss://ws.testnet.golos.io');
    golos.config.set('chain_id', '5876894a41e6361bde2e73278f07340f2eb8b41c2facd29099de9deef6cdb679');
    const keys = golos.auth.getPrivateKeys(
      GolosSettings.username,
      GolosSettings.password,
      ['posting']);
    this.wif = keys.posting;
    console.log(`keys: ${keys},\nwif: ${this.wif}`);
  }

  findPosts(tags) {
    return Observable.create(subscriber => {
      golos.api.getDiscussionsByCreated({
        select_tags: [GolosSettings.postParentPermlink],
        limit: 100,
      }, (err, result) => {
        if (!err) {
          const filtered = result.filter(post => {
            post.json_metadata = JSON.parse(post.json_metadata);
            return post.json_metadata.tags.every(
              tag => !(tags || []).length || tags.includes(tag));
          });
          subscriber.next(filtered);
        } else {
          subscriber.next(result);
        }
      });
    });
  }

  private fix(permlink) {
    return permlink.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
  }

  saveTag(tag: Tag) {
    return Observable.create(subscriber => {
      golos.broadcast.comment(
        this.wif,
        '',
        GolosSettings.tagParentPermlink,
        tag.author,
        `${this.fix(new Date().toISOString())} + -tag`,
        `tag-${tag.id}`,
        tag.itemName,
        {},
        function (err, result) {
          debugger;
          if (!err) {
            console.log('golos-api-service:result:', result);
            subscriber.next(result);
          } else {
            console.log('golos-api-service:error:', err);
            subscriber.error(err);
          }
        });
    });
  }

  savePost(post: Post) {
    return Observable.create(subscriber => {
      golos.broadcast.comment(
        this.wif,
        '',
        GolosSettings.postParentPermlink,
        post.author,
        this.fix(new Date().toISOString()) + '-post',
        post.title,
        post.body,
        post.jsonMetadata,
        function (err, result) {
          debugger;
          if (!err) {
            console.log('golos-api-service:result:', result);
            subscriber.next(result);
          } else {
            console.log('golos-api-service:error:', err);
            subscriber.error(err);
          }
        });
    });
  }

  findTags(): Observable<any[]> {
    return Observable.create(subscriber => {
      golos.api.getDiscussionsByCreated({
        select_tags: [GolosSettings.tagParentPermlink],
        limit: 100,
      }, (err, result) => {

        return subscriber.next({
          level1: {label: 'Тип объекта', values: ['Место', 'Собычно']},
          level2: {label: 'Тип заведения', values: ['Кофейня', 'Ресторан', 'Бар']},
          level3: {label: 'Интерьер', values: ['Лофт', 'Классический', 'Креатив']},
          level4: {label: 'Часто можно встретить', values: ['Хипстер', 'Айтишники', 'Творческие люди']},
        });

        // if (!err) {
        //   if (!result || !result.length) {
        //     subscriber.next([
        //       {id: 1, itemName: "cafe"},
        //       {id: 2, itemName: "restaurant"},
        //       {id: 3, itemName: "cafeteria"},
        //     ])
        //   } else {
        //     console.log('golos-api:service:result: ', result);
        //     subscriber.next(result);
        //   }
        // } else {
        //   debugger;
        //   console.log('golos-api.service:error:', err);
        //   subscriber.error(err);
        // }
      });
    });
  }
}
