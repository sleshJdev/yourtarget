import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class EventService {
  private subject = new Subject<any>();

  constructor() { }

  raise(event) {
    this.subject.next(event);
  }

  get event() {
    return this.subject.asObservable();
  }
}
