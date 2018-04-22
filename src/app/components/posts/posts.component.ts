import {Component, OnInit} from '@angular/core';
import {GolosApiService} from "../../common/golos-api.service";
import {EventService} from "../../common/event.service";
import Actions from "../../common/actions";
import {Action} from "rxjs/scheduler/Action";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private golosApiService: GolosApiService,
              eventService: EventService) {
    eventService.event.subscribe(event => {
      if (event.id === Actions.POST_ADD ||
          event.id === Actions.POST_VOTE) {
        this.findPosts();
      }
    })
  }

  ngOnInit() {
    this.findPosts();
  }

  private findPosts() {
    this.golosApiService
      .findPosts([])
      .subscribe(response => this.posts = response);
  }

  upVote(post, tag) {
    this.golosApiService
      .vote(post, tag, true)
      .subscribe(
        response => console.log('voted for post id=', post.id),
        error => console.log('error', error));
  }

  downVote(post, tag) {
    this.golosApiService
      .vote(post, tag, false)
      .subscribe(
        response => console.log('down voted for post id=', post.id, ', response: ', response),
        error => console.log('error during down voting', error));
  }

}
