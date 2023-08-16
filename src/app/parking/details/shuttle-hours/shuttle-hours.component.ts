import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetailsService } from 'src/app/service/details.service';

@Component({
  selector: 'app-shuttle-hours',
  templateUrl: './shuttle-hours.component.html',
  styleUrls: ['./shuttle-hours.component.scss']
})
export class ShuttleHoursComponent {

  operatingForm!: FormGroup
  operationTime: Array<{
    day: string
    open: string
    closed: string
  }> = []

  constructor(private _formBuilder: FormBuilder,private _detailService: DetailsService) { }
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
    const fromData = new FormData();
    fromData.append('monday_open_time', this.operatingForm.controls['openTime0'].value)
    fromData.append('monday_close_time', this.operatingForm.controls['closeTime0'].value)
    fromData.append('tuesday_open_time', this.operatingForm.controls['openTime1'].value)
    fromData.append('tuesday_close_time', this.operatingForm.controls['closeTime1'].value)
    fromData.append('wednesday_open_time', this.operatingForm.controls['openTime2'].value)
    fromData.append('wednesday_close_time', this.operatingForm.controls['closeTime2'].value)
    fromData.append('thursday_open_time', this.operatingForm.controls['openTime3'].value)
    fromData.append('thursday_close_time', this.operatingForm.controls['closeTime3'].value)
    fromData.append('friday_open_time', this.operatingForm.controls['openTime4'].value)
    fromData.append('friday_close_time', this.operatingForm.controls['closeTime4'].value)
    fromData.append('saturday_open_time', this.operatingForm.controls['openTime5'].value)
    fromData.append('saturday_close_time', this.operatingForm.controls['closeTime5'].value)
    fromData.append('sunday_open_time', this.operatingForm.controls['openTime6'].value)
    fromData.append('sunday_close_time', this.operatingForm.controls['closeTime6'].value)
    fromData.append('all_days', this.operatingForm.controls['operationHours'].value == 'limit' ? 'true' : 'false')
   this._detailService.createShuttleHours(fromData).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(error:HttpErrorResponse)=>{
      console.log(error)
    }
   })
  }
  get value() {
    return this.operatingForm.get('operationHours')?.value;
  }
}
