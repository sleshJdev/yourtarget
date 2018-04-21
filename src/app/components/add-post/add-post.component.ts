import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Tag from "../../model/Tag";
import {GolosApiService} from "../../common/golos-api.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: FormGroup;

  constructor(fb: FormBuilder,
              private golosApiService: GolosApiService) {
    this.post = fb.group({
      title: new FormControl('', [Validators.required]),
      picture: new FormControl(null, [Validators.required]),
      tags: new FormArray([], [Validators.required])
    });
  }

  dropdownList: Tag[] = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit() {
    this.golosApiService.findTags({
      select_tags: ['yourtarget-tags'],
      limit: 100,
    }).subscribe({
      next: response => {
        debugger;
      }
    });

    this.dropdownList = [
      {"id": 1, "itemName": "India"},
      {"id": 2, "itemName": "Singapore"},
      {"id": 3, "itemName": "Australia"},
      {"id": 4, "itemName": "Canada"},
      {"id": 5, "itemName": "South Korea"},
      {"id": 6, "itemName": "Germany"},
      {"id": 7, "itemName": "France"},
      {"id": 8, "itemName": "Russia"},
      {"id": 9, "itemName": "Italy"},
      {"id": 10, "itemName": "Sweden"}
    ];
    this.selectedItems = [
      {"id": 2, "itemName": "Singapore"},
      {"id": 3, "itemName": "Australia"},
      {"id": 4, "itemName": "Canada"},
      {"id": 5, "itemName": "South Korea"}
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Countries",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }

}
