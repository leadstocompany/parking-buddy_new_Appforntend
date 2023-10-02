import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DetailsService } from 'src/app/service/details.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

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
  spinner = false
  editData: any;
  shuttleId: any;
  updated: boolean = false;
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
    this.spinner = true
    let data: any;
    if (this.operatingForm.controls['operationHours'].value == 'limited') {
      data = {
        "shuttle_monday_open_time": this.operatingForm.controls['openTime0'].value,
        "shuttle_monday_close_time": this.operatingForm.controls['closeTime0'].value,
        "shuttle_tuesday_open_time": this.operatingForm.controls['openTime1'].value,
        "shuttle_tuesday_close_time": this.operatingForm.controls['closeTime1'].value,
        "shuttle_wednesday_open_time": this.operatingForm.controls['openTime2'].value,
        "shuttle_wednesday_close_time": this.operatingForm.controls['closeTime2'].value,
        "shuttle_thursday_open_time": this.operatingForm.controls['openTime3'].value,
        "shuttle_thursday_close_time": this.operatingForm.controls['closeTime3'].value,
        "shuttle_friday_open_time": this.operatingForm.controls['openTime4'].value,
        "shuttle_friday_close_time": this.operatingForm.controls['closeTime4'].value,
        "shuttle_saturday_open_time": this.operatingForm.controls['openTime5'].value,
        "shuttle_saturday_close_time": this.operatingForm.controls['closeTime5'].value,
        "shuttle_sunday_open_time": this.operatingForm.controls['openTime6'].value,
        "shuttle_sunday_close_time": this.operatingForm.controls['closeTime6'].value,
        "shuttle_all_days": false,
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      }
    } else {
      data = {
        "shuttle_monday_open_time": this.operatingForm.controls['openTime0'].value,
        "shuttle_monday_close_time": this.operatingForm.controls['closeTime0'].value,
        "shuttle_tuesday_open_time": this.operatingForm.controls['openTime1'].value,
        "shuttle_tuesday_close_time": this.operatingForm.controls['closeTime1'].value,
        "shuttle_wednesday_open_time": this.operatingForm.controls['openTime2'].value,
        "shuttle_wednesday_close_time": this.operatingForm.controls['closeTime2'].value,
        "shuttle_thursday_open_time": this.operatingForm.controls['openTime3'].value,
        "shuttle_thursday_close_time": this.operatingForm.controls['closeTime3'].value,
        "shuttle_friday_open_time": this.operatingForm.controls['openTime4'].value,
        "shuttle_friday_close_time": this.operatingForm.controls['closeTime4'].value,
        "shuttle_saturday_open_time": this.operatingForm.controls['openTime5'].value,
        "shuttle_saturday_close_time": this.operatingForm.controls['closeTime5'].value,
        "shuttle_sunday_open_time": this.operatingForm.controls['openTime6'].value,
        "shuttle_sunday_close_time": this.operatingForm.controls['closeTime6'].value,
        "shuttle_all_days": false,
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      }
    }

    this._detailService.createShuttleHours(data).subscribe({
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


  public UpdateValue() {
    this.spinner = true
    let data: any;
    if (this.operatingForm.controls['operationHours'].value == 'limited') {
      data = {
        "shuttle_monday_open_time": this.operatingForm.controls['openTime0'].value,
        "shuttle_monday_close_time": this.operatingForm.controls['closeTime0'].value,
        "shuttle_tuesday_open_time": this.operatingForm.controls['openTime1'].value,
        "shuttle_tuesday_close_time": this.operatingForm.controls['closeTime1'].value,
        "shuttle_wednesday_open_time": this.operatingForm.controls['openTime2'].value,
        "shuttle_wednesday_close_time": this.operatingForm.controls['closeTime2'].value,
        "shuttle_thursday_open_time": this.operatingForm.controls['openTime3'].value,
        "shuttle_thursday_close_time": this.operatingForm.controls['closeTime3'].value,
        "shuttle_friday_open_time": this.operatingForm.controls['openTime4'].value,
        "shuttle_friday_close_time": this.operatingForm.controls['closeTime4'].value,
        "shuttle_saturday_open_time": this.operatingForm.controls['openTime5'].value,
        "shuttle_saturday_close_time": this.operatingForm.controls['closeTime5'].value,
        "shuttle_sunday_open_time": this.operatingForm.controls['openTime6'].value,
        "shuttle_sunday_close_time": this.operatingForm.controls['closeTime6'].value,
        "shuttle_all_days": false,
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      }
    } else {
      data = {
        "shuttle_monday_open_time": this.operatingForm.controls['openTime0'].value,
        "shuttle_monday_close_time": this.operatingForm.controls['closeTime0'].value,
        "shuttle_tuesday_open_time": this.operatingForm.controls['openTime1'].value,
        "shuttle_tuesday_close_time": this.operatingForm.controls['closeTime1'].value,
        "shuttle_wednesday_open_time": this.operatingForm.controls['openTime2'].value,
        "shuttle_wednesday_close_time": this.operatingForm.controls['closeTime2'].value,
        "shuttle_thursday_open_time": this.operatingForm.controls['openTime3'].value,
        "shuttle_thursday_close_time": this.operatingForm.controls['closeTime3'].value,
        "shuttle_friday_open_time": this.operatingForm.controls['openTime4'].value,
        "shuttle_friday_close_time": this.operatingForm.controls['closeTime4'].value,
        "shuttle_saturday_open_time": this.operatingForm.controls['openTime5'].value,
        "shuttle_saturday_close_time": this.operatingForm.controls['closeTime5'].value,
        "shuttle_sunday_open_time": this.operatingForm.controls['openTime6'].value,
        "shuttle_sunday_close_time": this.operatingForm.controls['closeTime6'].value,
        "shuttle_all_days": false,
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      }
    }
    let fd = {
      data: data,
      id: this.shuttleId
    }
    this._detailService.UpdateShuttleHours(fd).subscribe({
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



  // update Service
  /**
 * Get single product
 */

  getSingleValues(id: any) {
    this._detailService.getShuttleHours(id).subscribe({
      next: (res) => {
        //console.log(res, 'single data')
        if (res.length) {
          //console.log(res.length)
          this.shuttleId = res[0].id
          this.setValues(res[0])
          this.updated = true
        } else {
          this.updated = false
        }
      },
      error: (error:any) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ '+error.error[0])
      }
    })
  }

  setValues(data: any) {
    this.operatingForm.setValue({
      operationHours: !data.shuttle_all_days ? 'limited' : '24/7',
      openTime0: this.convertToShortTimeFormat(data.shuttle_monday_open_time),
      openTime1: this.convertToShortTimeFormat(data.shuttle_tuesday_open_time),
      openTime2: this.convertToShortTimeFormat(data.shuttle_wednesday_open_time),
      openTime3: this.convertToShortTimeFormat(data.shuttle_thursday_open_time),
      openTime4: this.convertToShortTimeFormat(data.shuttle_friday_open_time),
      openTime5: this.convertToShortTimeFormat(data.shuttle_saturday_open_time),
      openTime6: this.convertToShortTimeFormat(data.shuttle_sunday_open_time),
      closeTime0: this.convertToShortTimeFormat(data.shuttle_monday_close_time),
      closeTime1: this.convertToShortTimeFormat(data.shuttle_tuesday_close_time),
      closeTime2: this.convertToShortTimeFormat(data.shuttle_wednesday_close_time),
      closeTime3: this.convertToShortTimeFormat(data.shuttle_thursday_close_time),
      closeTime4: this.convertToShortTimeFormat(data.shuttle_friday_close_time),
      closeTime5: this.convertToShortTimeFormat(data.shuttle_saturday_close_time),
      closeTime6: this.convertToShortTimeFormat(data.shuttle_sunday_close_time),
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
