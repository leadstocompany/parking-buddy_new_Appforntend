import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DetailsService } from 'src/app/service/details.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
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
  editData: any;
  constructor(private _formBuilder: FormBuilder, private _detailService: DetailsService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
  ngOnInit() {
    this.initForm();
    this.operationTime = [
      {
        day: 'Monday',
        open: '0.00',
        closed: '0.00'
      },
      {
        day: 'Tuesday',
        open: '0.00',
        closed: '0.00'
      },
      {
        day: 'Wednesday',
        open: '0.00',
        closed: '0.00'
      },
      {
        day: 'Thursday',
        open: '0.00',
        closed: '0.00'
      },
      {
        day: 'Friday',
        open: '0.00',
        closed: '0.00'
      },
      {
        day: 'Saturday',
        open: '0.00',
        closed: '0.00'
      },

      {
        day: 'Sunday',
        open: '0.00',
        closed: '0.00'
      },

    ]
    // Check edit or not 
    this.editData = this._saveService.getSharedData()
    //console.log(this.editData, 'this edit data 2888 ')
    if (this.editData.edit) {
      this.getSingleValues(this.editData.id)
    } else if (this.editData.edit === false) {
      this.getSingleValues(this._saveService.getPropertyId())
    }
  }

  initForm() {
    this.operatingForm = this._formBuilder.group({
      operationHours: ['limited'],
      openTime0: ['8:15'],
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
    let data: any;
    if (this.operatingForm.controls['operationHours'].value == 'limited') {
      data = {
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
        "all_days": false,
      }
    } else {
      data = {
        "monday_open_time": null,
        "monday_close_time": null,
        "tuesday_open_time": null,
        "tuesday_close_time": null,
        "wednesday_open_time": null,
        "wednesday_close_time": null,
        "thursday_open_time": null,
        "thursday_close_time": null,
        "friday_open_time": null,
        "friday_close_time": null,
        "saturday_open_time": null,
        "saturday_close_time": null,
        "sunday_open_time": null,
        "sunday_close_time": null,
        "all_days": true,
      }
    }

    const fd = {
      data: data,
      id: this.editData.edit?this.editData.id:this._saveService.getPropertyId()
    }
    this._detailService.createOperatingHours(fd).subscribe({
      next: (res) => {
        this.spinner = false
        if (this.editData.edit) {
          this.getSingleValues(this.editData.id)
        } else {
          this.getSingleValues(this._saveService.getPropertyId())
        }
        this._snackbarService.openSnackbar('✔ Form Successfully Updated')
      },
      error: (error) => {
        //console.log(error)
        this.spinner = false
        this._snackbarService.openSnackbar('❌ '+error.error[0])
      }
    })
  }
  get value() {
    return this.operatingForm.get('operationHours')?.value;
  }



  // update Service
  /**
 * Get single product
 */

  getSingleValues(id: any) {
    this._detailService.getSingleBasicDetailsService(id).subscribe({
      next: (res) => {
        //console.log(res, 'single data')
        this.setValues(res)
      },
      error: (error:any) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ '+error.error[0])
      }
    })
  }

  setValues(data: any) {
    this.operatingForm.setValue({
      operationHours: !data.all_days ? 'limited' : '24/7',
      openTime0: this.convertToShortTimeFormat(data.monday_open_time),
      openTime1: this.convertToShortTimeFormat(data.tuesday_open_time),
      openTime2: this.convertToShortTimeFormat(data.wednesday_open_time),
      openTime3: this.convertToShortTimeFormat(data.thursday_open_time),
      openTime4: this.convertToShortTimeFormat(data.friday_open_time),
      openTime5: this.convertToShortTimeFormat(data.saturday_open_time),
      openTime6: this.convertToShortTimeFormat(data.sunday_open_time),
      closeTime0: this.convertToShortTimeFormat(data.monday_close_time),
      closeTime1: this.convertToShortTimeFormat(data.tuesday_close_time),
      closeTime2: this.convertToShortTimeFormat(data.wednesday_close_time),
      closeTime3: this.convertToShortTimeFormat(data.thursday_close_time),
      closeTime4: this.convertToShortTimeFormat(data.friday_close_time),
      closeTime5: this.convertToShortTimeFormat(data.saturday_close_time),
      closeTime6: this.convertToShortTimeFormat(data.sunday_close_time),
    })

  }

  /**
   * convert in time formate
   * @param timeString 
   * @returns 
   */
  public convertToShortTimeFormat(timeString: string) {
    if (timeString) {
      const parts = timeString.split(':');
      const hours = parseInt(parts[0]);
      const minutes = parseInt(parts[1]);
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      //console.log(formattedTime, '-------------->')
      return formattedTime;
    } else {
      return null
    }

  }

  public removeDate(data: any) {
    //console.log(data)
    this.operatingForm.controls[data].setValue(null)
  }

}
