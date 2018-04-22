import {Component, OnInit} from '@angular/core';
import {GolosApiService} from "../../common/golos-api.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: any[];

  constructor(private golosApiService: GolosApiService) {
  }

  ngOnInit() {
    this.golosApiService
      .findPosts([])
      .subscribe(response => this.posts = response);
  }

  upVote(post, tag) {
    this.golosApiService
      .vote(post, tag)
      .subscribe(
        response => console.log('voted for post id=', post.id),
        error => console.log('error', error));
  }

  downVote(post, tag) {
    this.golosApiService
      .vote(post, tag)
      .subscribe(
        response => console.log('down voted for post id=', post.id, ', response: ', response),
        error => console.log('error during down voting', error));
  }

}
