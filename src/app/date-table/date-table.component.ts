import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-date-table',
  templateUrl: './date-table.component.html',
  styleUrls: ['./date-table.component.css']
})
export class DateTableComponent implements OnInit {

  @Input('selectedDate') selectedDate: Date;

  constructor() { }

  ngOnInit() {
  }

}
