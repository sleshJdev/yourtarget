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

}
