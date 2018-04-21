import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Tag from "../../model/Tag";
import {GolosApiService} from "../../common/golos-api.service";
import {GolosSettings} from "../../common/golos-settings";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: FormGroup;
  dropdownList: Tag[] = [];
  selectedItems = [];
  dropdownSettings = {
    singleSelection: false,
    text: "Select Countries",
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    enableSearchFilter: true,
    classes: "myclass custom-class"
  };

  constructor(fb: FormBuilder,
              private golosApiService: GolosApiService) {
    this.post = fb.group({
      title: new FormControl('', [Validators.required]),
      assets: new FormControl(null, [Validators.required]),
      tags: new FormArray([], [Validators.required])
    });
  }

  ngOnInit() {
    this.golosApiService.findTags()
      .subscribe(response => {
        this.dropdownList = response;
      });
  }

  save() {
    const title = this.post.value.title;
    this.golosApiService.savePost({
      parentAuthor: '',
      parentPermlink: GolosSettings.postParentPermlink,
      author: GolosSettings.username,
      permlink: `${GolosSettings.postParentPermlink}-${title}`,
      title: title,
      body: `<h1>${title}</h1>`,
      jsonMetadata: JSON.stringify({
        tags: this.selectedItems
      })
    }).subscribe();
  }

}
