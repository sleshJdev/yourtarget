import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GolosApiService} from "../../common/golos-api.service";
import {GolosSettings} from "../../common/golos-settings";
import {EventService} from "../../common/event.service";
import Actions from "../../common/actions";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: FormGroup;
  tag: FormGroup;
  tags: any[];
  openNewPropertyForm = false;

  constructor(private fb: FormBuilder,
              private golosApiService: GolosApiService,
              private eventService: EventService) {
    this.tag = fb.group({
      name: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.golosApiService.findTags()
      .subscribe(tags => {
        debugger;
        this.tags = tags;
        return this.post = this.fb.group({
          title: new FormControl('', [Validators.required]),
          metadata: new FormGroup({
            address: new FormControl('', [Validators.required]),
            voteTags: this.fb.group(
              tags.reduce((group, tag) => {
                debugger;
                const validators = [Validators.required];
                if (tag.values) {
                  validators.push(value => tag.values.includes(value));
                }
                group[tag.id] = new FormControl('', validators);
                return group;
              }, {}))
          })
        });
      }, error => console.log('add-post.component:error:', error));
  }

  addNewProperty() {
    if (this.tag.invalid) {
      return;
    }
    debugger;
    const tag = Object.assign(
      {id: `tag${this.tags.length}`},
      this.tag.value);
    const details = Object.assign({
      author: GolosSettings.username,
    }, tag);
    this.golosApiService
      .saveTag(details)
      .subscribe(response => {
        this.tags.push(tag);
        this.openNewPropertyForm = false;
      });
  }

  setTagValue(value, id) {
    const path = `metadata.voteTags.${id}`;
    this.post.get(path).setValue(value);
  }

  save() {
    if (this.post.invalid) {
      return;
    }
    debugger;
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
      response => {
        this.eventService.raise({
          id: Actions.POST_ADD,
          data: response
        });
        return console.log('add-post.component:save:response:', response);
      },
      error => console.log('add-post.component:save:error:', error));
  }

}
