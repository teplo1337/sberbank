import { Component, OnInit, Input, Output, Pipe, EventEmitter, ViewChildren, PipeTransform} from '@angular/core';
import { Event } from '../data-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.less']
})
@Pipe({name: 'exponentialStrength'})

export class DateEditorComponent implements OnInit, PipeTransform {

  @Input()
    set event(value: Event) {
      this._event = void 0;
      this.errorTime = void 0;

      if (value && value._id) {
        this.editEvent(value);

      } else if (value) {
        this.createEvent(value);

      }
      console.log(value);
      this._event = value;
    }

    get event(): Event {
      return this._event;
    }

  @Output() create = new EventEmitter<Event>();
  @Output() modify = new EventEmitter<Event>();
  @Output() delete = new EventEmitter<Event>();
  @Output() back = new EventEmitter<Event>();
  @ViewChildren('select') selectors;

  private _event: Event;
  buttonText: string;

  startTime: string [];
  endTime: string[];
  noEditPrivilege = true;
  errorTime: boolean;

  transform(value: number, exponent: string): string {
    return 'kaka';
  }

  constructor() {
  }

  ngOnInit() {
    this.startTime = this.getTimes(false);
    this.endTime = this.getTimes(true);
  }

  editEvent (value: Event) {

    console.log('edit');
    this.noEditPrivilege = true;
    this.buttonText = 'Изменить';
  }

  createEvent (value: Event) {

    console.log('create');
    this.noEditPrivilege = false;
    this.buttonText = 'Создать';
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
  checkDateValid (value: boolean): boolean {
    if (value) {
      const selectedStartTime = Number(this.selectors.toArray()[0].nativeElement.value);
      const selectedEndTime = Number(this.selectors.toArray()[1].nativeElement.value);
      if (selectedEndTime - selectedStartTime >= 0) {
        return true;
      }
    }
    return false;
  }
  onSubmit(form: NgForm) {
    if (this.checkDateValid (form.valid)) {
      this.event.who = '';
      this.event.title = '';
      this.event.start_time = Number(this.selectors.toArray()[0].nativeElement.value);
      this.event.end_time = Number(this.selectors.toArray()[1].nativeElement.value);

      if (this._event._id) {
        this.modify.emit(this.event);
      } else {
        this.create.emit(this.event);
      }
    } else {
      this.errorTime = true;
    }
  }

  changeEditPrivilege () {
    this.noEditPrivilege = false;
  }

  moveBack () {
    this.back.emit(this.event);
  }

  deleteEvent () {
    this.delete.emit(this.event);
  }

}
