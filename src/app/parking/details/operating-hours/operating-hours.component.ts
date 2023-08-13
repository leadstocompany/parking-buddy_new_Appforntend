import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-operating-hours',
  templateUrl: './operating-hours.component.html',
  styleUrls: ['./operating-hours.component.scss']
})
export class OperatingHoursComponent {
  operatingForm!: FormGroup
  operationTime: Array<{
    day: string
    open: string
    closed: string
  }> = []

  constructor(private _formBuilder: FormBuilder) { }
  ngOnInit() {
    this.operatingForm = this._formBuilder.group({
      operationHours: ['']
    })
    this.operationTime = [
      {
        day: 'Monday',
        open: '8:00 AM',
        closed: '8:00 PM'
      },
      {
        day: 'Tuesday',
        open: '8:00 AM',
        closed: '8:00 PM'
      },
      {
        day: 'Wednesday',
        open: '8:00 AM',
        closed: '8:00 PM'
      },
      {
        day: 'Thursday',
        open: '8:00 AM',
        closed: '8:00 PM'
      },
      {
        day: 'Friday',
        open: '8:00 AM',
        closed: '8:00 PM'
      },
      {
        day: 'Saturday',
        open: '8:00 AM',
        closed: '8:00 PM'
      },

      {
        day: 'Sunday',
        open: '8:00 AM',
        closed: '8:00 PM'
      },

    ]
  }

  public saveForm(event: any): void {
    console.log(this.operatingForm)
  }
}
