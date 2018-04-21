import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AddPostComponent} from "./components/add-post/add-post.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'posts/add', component: AddPostComponent},
      {path: '**', component: HomeComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
