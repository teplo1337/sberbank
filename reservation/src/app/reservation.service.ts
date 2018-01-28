import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event, RoomsDocument } from './data-model';

@Injectable()
export class ReservationService {

  /* events */

  getAllEvents(date: string) {
    const params = {
      'day': date
    };
    return this.http.get('/api', {params});
  }

  newEvent(event: Event) {
    return this.http.post('/api', event);
  }

  modifyEvent(event: Event) {
    return this.http.put('/api', event);
  }

  deleteEvent(event: Event) {
    return this.http.delete('/api/' + event._id);
  }

  /* rooms */

  getRooms () {
    return this.http.get('/api/rooms/' + 'rooms');
  }

  modifyRooms (rooms: RoomsDocument) {
    return this.http.put('/api/rooms', rooms);
  }

  constructor(private http: HttpClient) { }

}
