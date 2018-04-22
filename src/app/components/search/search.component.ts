import {Component, OnInit, ViewChild} from '@angular/core';
import {GolosSettings} from "../../common/golos-settings";
import {AppComponent} from "../../app.component";
import {Filter} from "../../model/Filter";
import {Observable} from "rxjs/Observable";
import {GolosApiService} from "../../common/golos-api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tags: string[] = [];
  filter: Filter;
  posts: any[];
  @ViewChild(AppComponent) app: AppComponent;

  constructor(private golosApiService: GolosApiService) {
  }

  ngOnInit() {
    const parentAuthor = '';
    const parentPermlink = GolosSettings.appName;
    const author = GolosSettings.username;
    const permlink = "yourtarget-main-filter";
    const title = "Фильтр поиска объектов";
    const body = '<h1>Главный фильтр поиска объектов"</h1><p>Этот пост был создан в приложении "YourTarget"</p>';

    const jsonMetadata = JSON.stringify({
        objectType: [{
          typeValue: 'Место',
          objectName: 'Тип заведения',
          object: [{
            objectValue: 'Кофейня',
            criteria: [
              {
                criterionName: 'Интерьер',
                criterionValue: ['Лофт', 'Классический', 'Креатив']
              }, {
                criterionName: 'Часто можно встретить',
                criterionValue: ['Хипстер', 'Айтишники', 'Творческие люди', 'Деловые люди']
              }
            ]
          }, {
            objectValue: 'Ресторан',
            criteria: [
              {
                criterionName: 'Интерьер',
                criterionValue: ['Лофт', 'Классический', 'Креатив']
              }, {
                criterionName: 'Часто можно встретить',
                criterionValue: ['Важные персоны', 'Айтишники', 'Творческие люди', 'Деловые люди']
              }
            ]
          }]
        }, {
          typeValue: 'Событие',
          objectName: 'Тип события',
          object: [{
            objectValue: 'Чаепитие',
            criteria: [
              {
                criterionName: 'Вид чая',
                criterionValue: ['Черный', 'Зеленый', 'Красный']
              }, {
                criterionName: 'Часто можно встретить',
                criterionValue: ['Хипстер', 'Айтишники', 'Творческие люди', 'Деловые люди']
              }
            ]
          }, {
            objectValue: 'Концерт',
            criteria: [
              {
                criterionName: 'Группа',
                criterionValue: ['Би-2', 'Rasmus', 'Ольга Бузова']
              }, {
                criterionName: 'Часто можно встретить',
                criterionValue: ['Хипстер', 'Айтишники', 'Творческие люди', 'Деловые люди']
              }
            ]
          }]
        }]
      }
    );
    golos.broadcast.comment(this.app.wif, parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata,
      function (err, result) {
        //console.log(err, result);
        if (!err) {
          console.log('comment', result);
        }
        else console.error(err);
      }
    );
    this.getFilter([GolosSettings.appName, 'yourtarget-main-filter'])
      .subscribe(response => this.filter = response);
  }

  getFilter(params: string[]) {
    return Observable.create(subscriber => {
      golos.api.getDiscussionsByCreated({
        select_tags: [params],
        limit: 100,
      }, (err, result) => {
        console.log(err, result);
        if (!err) {
          const filtered = result.filter(post => {
            post.json_metadata = JSON.parse(post.json_metadata);
            return post.json_metadata;
          });
          subscriber.next(filtered);
        } else {
          console.error(err);
          subscriber.next(result);
        }
      });
    });
  }

  search() {
    this.golosApiService
      .findPosts([])
      .subscribe(response => this.posts = response);
  }
}
