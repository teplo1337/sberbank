import { Component, OnInit, Input, Output} from '@angular/core';
import { Event } from '../event';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.less']
})
export class DateEditorComponent implements OnInit {
  private _event: Event;
  @Input()
    set event(value: Event) {
      if (value && value._id) {
        this.editEvent(value);

      } else if (value) {
        this.createEvent(value);

      }
      this._event = value;
    }
    get event(): Event {
      return this._event;
    }


  constructor() { }

  ngOnInit() {
  }

  editEvent (value) {

    console.log('edit');
  }

  createEvent (value) {

    console.log('create');
  }
}
