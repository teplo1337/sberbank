import { Component, OnInit, Input, Output, Pipe, PipeTransform} from '@angular/core';
import { Event } from '../event';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.less']
})
@Pipe({name: 'exponentialStrength'})

export class DateEditorComponent implements OnInit, PipeTransform {
  private _event: Event;
  startTime: string [];
  endTime: string[];

  transform(value: number, exponent: string): string {
    return 'kaka';
  }

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
    this.startTime = this.getTimes(false);
    this.endTime = this.getTimes(true);
  }

  editEvent (value: Event) {
    console.log(value);
  }

  createEvent (value: Event) {
    console.log(value);
  }

  getTimes(value: boolean): string [] {
    const times: string [] = [];
    for (let i = 8; i < 20; i++) {
      for (let j = 0; j < 2; j++) {
        let time: string;
        if (value) {
          time = (i + 1 * j) + ':' + ((j === 0) ? '30' : '00');
        } else {
          time = i + ':' + ((j === 0) ? '00' : '30');
        }
        times.push(time);
      }
    }
    return times;
  }
}
