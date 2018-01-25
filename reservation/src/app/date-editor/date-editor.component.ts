import { Component, OnInit, Input, Output, Pipe, EventEmitter, ViewChildren, } from '@angular/core';
import { Event } from '../data-model';
import { NgForm } from '@angular/forms';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.less']
})

export class DateEditorComponent implements OnInit {

  @Input()
    set event(value: Event) {
      this._event = void 0;
      this.errorTime = void 0;

      if (value && value._id) {
        this.editMode(value);

      } else if (value) {
        this.createMode(value);

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

  success: boolean;
  errorTime: boolean;
  errorTimeAllow: boolean;
  errorDelete: boolean;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.startTime = this.getTimes(false);
    this.endTime = this.getTimes(true);
  }

  editMode (value: Event) {

    console.log('edit');
    this.noEditPrivilege = true;
    this.buttonText = 'Изменить';
  }

  createMode (value: Event) {

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
      /* const duration = selectedEndTime - selectedStartTime;
      for(let i = selectedStartTime; i <= selectedEndTime; i++) {
        console.log(i);
        if (!this.event.allowedDates[i]) {
          this.errorTimeAllow = true;
          return false;
        }
      }
      */
      if (selectedEndTime - selectedStartTime >= 0) {
        return true;
      }
    }
    return false;
  }

  deleteErrors () {
    this.errorTime = false;
    this.errorTimeAllow = false;
    this.errorDelete = false;
  }

  onSubmit(form: NgForm) {
    this.deleteErrors ();
    if (this.checkDateValid (form.valid)) {

      this.event.start_time = Number(this.selectors.toArray()[0].nativeElement.value);
      this.event.end_time = Number(this.selectors.toArray()[1].nativeElement.value);

      if (this._event._id) {
        this.modifyEvent(this.event);
      } else {
        this.createEvent(this.event);
      }
    } else {
      this.errorTime = true;
    }
  }

  clickEdit () {
    this.noEditPrivilege = false;
  }

  moveBack () {
    this.back.emit(this.event);
  }

  createEvent (event: Event) {

    this.reservationService.newEvent(event).subscribe(
      (result: any) => {
        if (result.insertedCount === 1) {
          this.success = true;
          setTimeout(() => this.moveBack(), 2000);
        }
        console.log(result);
      },
      (err) => {
        this.errorTimeAllow = true;
        console.log(err);
    });
  }

  modifyEvent (event: Event) {
    this.reservationService.modifyEvent(event).subscribe(
      (result) => {
        this.success = true;
        setTimeout(() => this.moveBack(), 2000);
        console.log(result);
      },
      (err) => {
        this.errorTimeAllow = true;

        console.log(err);
    });
  }

  deleteEvent() {
    this.reservationService.deleteEvent(this.event).subscribe(
      (result) => {
        this.success = true;
        setTimeout(() => this.moveBack(), 2000);
        console.log(result);
      },
      (err) => {
        this.errorDelete = true;
        console.log(err);
    });
  }

}
