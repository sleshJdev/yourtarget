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
      }, error => console.log('add-post.component:error:', error));
  }

  save() {
    this.golosApiService.savePost({
      author: GolosSettings.username,
      title: this.post.value.title,
      body: this.post.value.title,
      jsonMetadata: {
        app: GolosSettings.appName,
        tags: this.selectedItems.map(it => it.itemName)
      }
    }).subscribe(
      response => console.log('add-post.component:response:', response),
      error => console.log('add-post.component:error:', error));
  }

}
