import { Component, OnInit, Input, Output, Pipe, ViewChildren, PipeTransform} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from '../data-model';

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
      if (value && value._id) {

      this.createForm(this.fb, value);
        this.editEvent(value);

      } else if (value) {

      this.createForm(this.fb, value);
      this.createEvent(value);

      }
      this._event = value;
    }

    get event(): Event {
      return this._event;
    }

  @ViewChildren('select') selectors;

  private _event: Event;
  startTime: string [];
  endTime: string[];
  editorForm: FormGroup;
  errorTime: boolean;

  transform(value: number, exponent: string): string {
    return 'kaka';
  }

  constructor(private fb: FormBuilder) {
  }

  createForm(fb: FormBuilder, value: Event) {
    this.editorForm = fb.group({
      inputs: fb.group({
        who: [value.who, Validators.required],
        title: [value.title, Validators.required],
      }),
    });
  }

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
  checkDateValid (): boolean {
    if (this.editorForm.valid) {
      const selectedStartTime = this.selectors.toArray()[0].nativeElement.value;
      const selectedEndTime = this.selectors.toArray()[1].nativeElement.value;
      if (selectedEndTime - selectedStartTime >= 0) {
        return true;
      }
    }
    return false;
  }
  onSubmit() {
    if (this.checkDateValid ()) {
      this.errorTime = false;
      console.log('ok');
    } else {
      this.errorTime = true;
    }
  }
}
