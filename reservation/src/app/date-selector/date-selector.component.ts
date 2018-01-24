import { EventEmitter, Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.less']
})
export class DateSelectorComponent implements OnInit {

  @Output() result: EventEmitter<Date> = new EventEmitter();

  selectedDate: string;
  error: string;

  constructor() {
    this.selectedDate = new Date().toISOString().split('T')[0];
   }

  ngOnInit() {
  }

  checkDate(value) {
    this.error = null;

    if (this.validate(value)) {
      this.result.emit(value);

    } else {
      this.initError('Please enter valid date');
    }
  }

  validate(value): boolean {
    if (isNaN((new Date(value)).getTime())) {
      return false;

    } else {
      return true;
    }
 }

  initError (text) {
    this.error = text;
  }
}
