import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Event } from '../data-model';
import { Room, Time } from './room';

@Component({
  selector: 'app-date-table',
  templateUrl: './date-table.component.html',
  styleUrls: ['./date-table.component.less']
})
export class DateTableComponent implements OnInit {
  private _selectedDate: string;
  events: Event [];

  startTime: string [];
  endTime: string [];

  rooms: Room [] = [];

  selectedEvent: Event;
  showTable: boolean;
  showEditor: boolean;

  @Input()
    set selectedDate(value: string) {
      if (value) {
        this._selectedDate = value;
        this.initComponent();
      }
    }
    get selectedDate(): string {
      return this._selectedDate;
    }

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {

  }

  initComponent () {
    this.getEvents().then(() => {
      this.rooms = [];
      this.startTime = this.getTimes(false);
      this.endTime = this.getTimes(true);

      this.rooms.push(this.getRoom(0, 'комната 1'));
      this.rooms.push(this.getRoom(1, 'комната 2'));
      console.log(this.rooms);
      this.showTable = true;
      this.showEditor = false;
    });
  }

  getEvents() {
    return new Promise ((resolve) => {
      this.reservationService.getAllEvents(this.selectedDate).subscribe(
        (result: Event []) => {
         this.events = result;
         resolve(true);
        },
        (err) => {
          resolve(true);
          console.log(err);
        }
      );
    });
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

  getRoom( id: number, roomName ): Room {
    const newRoom = new Room;
    newRoom.id = id;
    newRoom.name = roomName;
    newRoom.times = this.getRoomTimes(newRoom.id, newRoom.name);

    return newRoom;
  }

  getRoomTimes(id: number, roomName: string): Time [] {
    const times: Time [] = [];
    for (let i = 0; i < 12; i++) {

      for (let j = 0; j < 2; j++) {
        const time = new Time;

        time.busy = false;
        time.title = null;

        time.event_id = null;
        time.roomId = id;
        time.roomName = roomName;

        time.startTime = i * 2 + j;
        times.push(time);

      }
    }

    this.events.forEach((event: Event) => {
      if (event.room_id === id) {
        const indexStart = event.start_time;
        const indexEnd = event.end_time;
        const duration = indexEnd - indexStart;

        for (let i = 0; i <= duration; i++) {
          times[indexStart + i].endTime = event.end_time;
          times[indexStart + i].busy = true;
          times[indexStart + i].event_id = event._id;
          times[indexStart + i].title = event.title;
        }
      }
    });
    return times;
  }

  selectRoom(time: Time) {
    console.log(time);
    if (time.event_id) {
      this.editEvent(time);
    } else {
      this.editNewEvent(time);
    }
  }

  editEvent(time: Time) {
    console.log('edit');
    this.selectedEvent = new Event;
    this.selectedEvent = this.events.filter((event: Event): Event => {
      if (event._id === time.event_id) {
        event.roomName = time.roomName;
        return event;
      }
    }).pop();
    this.selectedEvent.allowedDates = this.genAllowDates(this.selectedEvent.room_id);
    this.showTable = false;
    this.showEditor = true;
  }

  editNewEvent(time: Time) {
    this.selectedEvent = void 0;
    this.selectedEvent = new Event;
    this.selectedEvent.room_id = time.roomId;
    this.selectedEvent.start_time = time.startTime;
    this.selectedEvent.day = this.selectedDate;
    this.selectedEvent.end_time = time.startTime;
    this.selectedEvent.who = '';
    this.selectedEvent.title = '';
    this.selectedEvent.roomName = time.roomName;
    this.selectedEvent.allowedDates = this.genAllowDates(this.selectedEvent.room_id);
    this.showTable = false;
    this.showEditor = true;
  }
 /* */
  genAllowDates (id: number): boolean [] {

    console.log('ok');

    const dates: boolean [] = [];
    this.rooms[id].times.forEach((time: Time) => {
      if (!time.busy) {
        dates.push(true);
      } else {
        dates.push(false);
      }
    });
    console.log(dates);
    return dates;
  }

  backToTable(event: Event) {
    this.rooms = [];
    this.initComponent();
    this.selectedDate = event.day;
    this.showEditor = false;
  }
}





