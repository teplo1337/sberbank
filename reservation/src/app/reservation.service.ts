import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReservationService {

  getAllEvents(event) {
    const params = {
      'day': event
    };
    return this.http.get('/api', {params});
  }

  newEvent(event) {
    return this.http.post('/api', event);
  }

  modifyEvent(event) {
    return this.http.put('/api', event);
  }

  deleteEvent(event) {
    return this.http.delete('/api/' + event);
  }


  constructor(private http: HttpClient) { }

}
