import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.less']
})
export class ReservationComponent implements OnInit {
  selectedDate: Date;

  constructor() { }

  ngOnInit() {
  }
  getDate(event) {
    this.selectedDate = event;
  }
}
