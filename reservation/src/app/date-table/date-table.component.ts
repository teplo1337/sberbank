import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Event } from '../event';
import { Room, Time } from './room';

@Component({
  selector: 'app-date-table',
  templateUrl: './date-table.component.html',
  styleUrls: ['./date-table.component.less']
})
export class DateTableComponent implements OnInit {
  private _selectedDate: string;
  events: Event [];
  times: string [];
  room: Room;
  room2: Room;
  selectedEvent: Event;

  @Input()
    set selectedDate(value: string) {
      if (value) {
        this._selectedDate = value;
        this.getEvents().then(() => {
          this.times = this.getTimes();
          this.room = this.getRoom(0, 'room one');
          this.room2 = this.getRoom(1, 'room two');
        });
      }
    }
    get selectedDate(): string {
      return this._selectedDate;
    }

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {

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

  getTimes() {
    const times: string [] = [];
    for (let i = 8; i < 20; i++) {
      for (let j = 0; j < 2; j++) {
        times.push(i + ':' + ((j === 0) ? '00' : '30'));
      }
    }
    console.log(times);
    return times;
  }

  getRoom( id: number, roomName ) {
    const newRoom = new Room;
    console.log(id);
    newRoom.id = id;
    newRoom.name = roomName;
    console.log(newRoom.id);
    newRoom.times = this.getRoomTimes(newRoom.id);

    return newRoom;
  }

  getRoomTimes(id: number) {
    const times: Time [] = [];
    for (let i = 8; i < 20; i++) {
      for (let j = 0; j < 2; j++) {
        const time = new Time;
        time.busy = false;
        time.title = null;
        time.event_id = null;
        time.roomId = id;
        time.startTime = i;

        times.push(time);
      }

    }

    this.events.forEach((event: Event) => {
      console.log(event.room_id);
      console.log(id);
      if (event.room_id === id) {
        const indexStart = event.start_time;
        const indexEnd = event.end_time;
        const duration = indexEnd - indexStart;
        for (let i = 0; i < duration; i++) {
          times[indexStart + i].busy = true;
          times[indexStart + i].event_id = event._id;
          times[indexStart + i].title = event.title;
        }
      }
    });
    console.log(times);
    return times;
  }

  selectRoom(time: Time) {
    if (time.event_id) {
      this.selectedEvent = this.events.filter((event: Event) => {
        if (event._id === time.event_id) {
          return event;
        }
      }).pop();
    } else {
      this.createNewEvent(time);
    }
  }

  createNewEvent(time: Time) {
    this.selectedEvent = new Event;
    this.selectedEvent.room_id = time.roomId;
    this.selectedEvent.start_time = time.startTime;
    this.selectedEvent.day = this.selectedDate;
    this.selectedEvent.end_time = time.startTime + 1;
    this.selectedEvent.who = 'me';
    this.selectedEvent.title = 'new meeting';
  }
}





