import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GolosApiService} from "../../common/golos-api.service";
import {GolosSettings} from "../../common/golos-settings";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  levels: any[];
  levelTags: any[];
  post: FormGroup;

  constructor(private fb: FormBuilder,
              private golosApiService: GolosApiService) {
  }

  ngOnInit() {
    this.golosApiService.findTags()
      .subscribe(response => {
        this.levels = Object.keys(response);
        this.levelTags = response;
        this.post = this.fb.group({
          title: new FormControl('', [Validators.required]),
          metadata: new FormGroup({
            address: new FormControl('', [Validators.required]),
            voteTags: this.fb.group(
              this.levels.reduce((group, level) => {
                const values = response[level].values;
                group[level] = new FormControl('', [
                  Validators.required,
                  value => values.includes(value)
                ]);
                return group;
              }, {}))
          })
        });
      }, error => console.log('add-post.component:error:', error));
  }

  setTagValue(value, level) {
    const path = `metadata.voteTags.${level}`;
    this.post.get(path).setValue(value);
  }

  save() {
    if (this.post.invalid) {
      return;
    }
    const post = this.post.value;
    post.metadata.voteTags = Object
      .entries(post.metadata.voteTags)
      .map(pair => ({
        level: pair[0],
        value: pair[1],
        upVotes: 0,
        downVotes: 0,
      }));

    this.golosApiService.savePost({
      author: GolosSettings.username,
      title: post.title,
      body: `<div>${post.title}</div>`,
      jsonMetadata: post.metadata
    }).subscribe(
      response => console.log('add-post.component:save:response:', response),
      error => console.log('add-post.component:save:error:', error));
  }

}
