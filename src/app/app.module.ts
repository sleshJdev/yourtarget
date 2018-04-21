import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AddPostComponent} from './components/add-post/add-post.component';
import {AppRouterModule} from './app-router.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { GolosApiService } from './common/golos-api.service';


@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMultiSelectModule,
    AppRouterModule
  ],
  providers: [GolosApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
