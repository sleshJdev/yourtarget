import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AddPostComponent} from './components/add-post/add-post.component';
import {AppRouterModule} from './app-router.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './components/home/home.component';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {SearchComponent} from "./components/search/search.component";
import {GolosApiService} from './common/golos-api.service';
import {PostsComponent} from './components/posts/posts.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    HomeComponent,
    SearchComponent,
    PostsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    AppRouterModule
  ],
  providers: [GolosApiService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
