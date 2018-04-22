import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
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

  vote(post, tag, up = true) {
    return Observable.create(subscriber => {
      golos.broadcast.vote(
        this.wif,
        GolosSettings.username,
        post.author,
        post.permlink,
        (up ? 1 : -1) * 5000,
        (err, result) => {
          if (!err) {
            debugger;
            console.log('golos-api.service:vote:result:', result);
            this.changeVotesAndUpdatePost(post, tag, up).subscribe(subscriber);
          } else {
            console.log('golos-api.service:vote:error:', err);
            subscriber.error(err);
          }
        });
    });
  }

  private changeVotesAndUpdatePost(post, tag, up) {
    debugger;
    const votedTag = post.json_metadata.voteTags.find(
      it => it === tag || it.level === tag.level);
    if (up) {
      ++votedTag.upVotes;
    } else {
      --votedTag.downVotes;
    }
    return this.savePost(post);
  }

  findPosts(searchTags) {
    debugger;
    return Observable.create(subscriber => {
      golos.api.getDiscussionsByCreated({
        select_tags: [GolosSettings.postParentPermlink],
        limit: 100,
      }, (err, result) => {
        debugger;
        if (!err) {
          const filtered = result.filter(post => {
            post.json_metadata = JSON.parse(post.json_metadata);
            post.json_metadata.tagValues = Object
              .entries(post.json_metadata.voteTags || [])
              .map(keyValuePair => keyValuePair[1]);
            return post.json_metadata.tagValues.every(tag =>
              !(searchTags || []).length || searchTags.includes(tag));
          });
          console.log('golos-api.service:findPosts:result:', filtered);
          subscriber.next(filtered);
        } else {
          console.log('golos-api.service:findPosts:error:', err);
          subscriber.error(err);
        }
      });
    });
  }

  private fix(permlink) {
    return permlink.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();
  }

  saveTag(tag: any) {
    debugger;
    return Observable.create(subscriber => {
      golos.broadcast.comment(
        this.wif,
        '',
        GolosSettings.tagParentPermlink,
        GolosSettings.username,
        this.fix(new Date().toISOString()) + '-tag',
        tag.label,
        tag.value,
        {
          id: tag.id,
          label: tag.label,
          value: tag.value
        },
        (err, result) => {
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

  savePost(post: any) {
    debugger;
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
        (err, result) => {
          debugger;
          if (!err) {
            console.log('golos-api-service:savePost:result:', result);
            subscriber.next(result);
          } else {
            console.log('golos-api-service:savePost:error:', err);
            subscriber.error(err);
          }
        });
    });
  }

  findTags(): Observable<any> {
    return Observable.create(subscriber => {
      golos.api.getDiscussionsByCreated({
        select_tags: [GolosSettings.tagParentPermlink],
        limit: 100,
      }, (err, result) => {
        if (!err) {
          debugger;
          console.log('golos-api:service:result: ', result);
          subscriber.next([
            {id: 'tag1', label: 'Type of the object', values: ['Место', 'Собычно']},
            {id: 'tag2', label: 'Place type', values: ['Кофейня', 'Ресторан', 'Бар']},
            {id: 'tag3', label: 'Interior', values: ['Лофт', 'Классический', 'Креатив']},
            {id: 'tag4', label: 'You can often meet', values: ['Хипстер', 'Айтишники', 'Творческие люди']},
          ].concat((result || []).map(tag => {
            return JSON.parse(tag.json_metadata);
          })));
        } else {
          console.log('golos-api.service:error:', err);
          subscriber.error(err);
        }
      });
    });
  }
}
