import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DetailsService } from 'src/app/service/details.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

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
  spinner = false
  constructor(private _formBuilder: FormBuilder, private _detailService: DetailsService,private _snackbarService: SnackbarService) { }
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
      openTime0: [null],
      openTime1: [null],
      openTime2: [null],
      openTime3: [null],
      openTime4: [null],
      openTime5: [null],
      openTime6: [null],
      closeTime0: [null],
      closeTime1: [null],
      closeTime2: [null],
      closeTime3: [null],
      closeTime4: [null],
      closeTime5: [null],
      closeTime6: [null],
    });
  }

  public saveForm(event: any): void {
    // const fromData = new FormData();
    // fromData.append('monday_open_time', this.operatingForm.controls['openTime0'].value)
    // fromData.append('monday_close_time', this.operatingForm.controls['closeTime0'].value)
    // fromData.append('tuesday_open_time', this.operatingForm.controls['openTime1'].value)
    // fromData.append('tuesday_close_time', this.operatingForm.controls['closeTime1'].value)
    // fromData.append('wednesday_open_time', this.operatingForm.controls['openTime2'].value)
    // fromData.append('wednesday_close_time', this.operatingForm.controls['closeTime2'].value)
    // fromData.append('thursday_open_time', this.operatingForm.controls['openTime3'].value)
    // fromData.append('thursday_close_time', this.operatingForm.controls['closeTime3'].value)
    // fromData.append('friday_open_time', this.operatingForm.controls['openTime4'].value)
    // fromData.append('friday_close_time', this.operatingForm.controls['closeTime4'].value)
    // fromData.append('saturday_open_time', this.operatingForm.controls['openTime5'].value)
    // fromData.append('saturday_close_time', this.operatingForm.controls['closeTime5'].value)
    // fromData.append('sunday_open_time', this.operatingForm.controls['openTime6'].value)
    // fromData.append('sunday_close_time', this.operatingForm.controls['closeTime6'].value)
    // fromData.append('all_days', this.operatingForm.controls['operationHours'].value == 'limit' ? 'true' : 'false')

    this.spinner = true
    const data = {
      data:{
      "monday_open_time": this.operatingForm.controls['openTime0'].value,
      "monday_close_time": this.operatingForm.controls['closeTime0'].value,
      "tuesday_open_time": this.operatingForm.controls['openTime1'].value,
      "tuesday_close_time": this.operatingForm.controls['closeTime1'].value,
      "wednesday_open_time": this.operatingForm.controls['openTime2'].value,
      "wednesday_close_time": this.operatingForm.controls['closeTime2'].value,
      "thursday_open_time": this.operatingForm.controls['openTime3'].value,
      "thursday_close_time": this.operatingForm.controls['closeTime3'].value,
      "friday_open_time": this.operatingForm.controls['openTime4'].value,
      "friday_close_time": this.operatingForm.controls['closeTime4'].value,
      "saturday_open_time": this.operatingForm.controls['openTime5'].value,
      "saturday_close_time": this.operatingForm.controls['closeTime5'].value,
      "sunday_open_time": this.operatingForm.controls['openTime6'].value,
      "sunday_close_time": this.operatingForm.controls['closeTime6'].value,
      "all_days": this.operatingForm.controls['operationHours'].value == 'limit' ? true : false,
  },
  id:localStorage.getItem('detailsId')
}

    this._detailService.createOperatingHours(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
      },
      error: (error) => {
        console.log(error)
        this.spinner = false
        this._snackbarService.openSnackbar('❌ Internal Server Error')
      }
    })
  }
  get value() {
    return this.operatingForm.get('operationHours')?.value;
  }
  
}
