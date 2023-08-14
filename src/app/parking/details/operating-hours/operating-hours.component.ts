import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
    this.initForm();
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


  initForm() {
    this.operatingForm = this._formBuilder.group({
      operationHours: ['limited'],
      openTime0: [''],
      openTime1: [''],
      openTime2: [''],
      openTime3: [''],
      openTime4: [''],
      openTime5: [''],
      openTime6: [''],
      closeTime0: [''],
      closeTime1: [''],
      closeTime2: [''],
      closeTime3: [''],
      closeTime4: [''],
      closeTime5: [''],
      closeTime6: [''],
    });
  }

  public saveForm(event: any): void {
    console.log(this.operatingForm.value)
  }
  get value(){
     return this.operatingForm.get('operationHours')?.value;
  }
}
