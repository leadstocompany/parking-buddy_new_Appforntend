import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import countryState from 'src/app/parking/details/general/country-states.json'
import { DetailsService } from 'src/app/service/details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/service/snackbar.service';
interface Country {
  [code: string]: string;
};
@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent {
  public selectedTabIndex: number = 0
  public changeIndex(index:number){
    this.selectedTabIndex = +index
  }

  generalForm!: FormGroup
  operatingForm!: FormGroup
  countries: Country = countryState.country;
  allState: any = countryState.states;
  state: any = this.allState['IN'];
  spinner: boolean = false
  operationTime: Array<{
    day: string
    open: string
    closed: string
  }> = []
  constructor(private formBuilder: FormBuilder, private _detailService: DetailsService, private _snackbarService: SnackbarService) { }
  ngOnInit() {
    // details part
    this.generalForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['IN', Validators.required],
      state: ['Madhya Pradesh', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      shuttleNumber: ['', Validators.required],
      flexNumber: ['', Validators.required],
      shuttleBus: ['',]
    })

    // operating hours
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
  public saveForm(event: any) {
    this.validate(event)
    if (!this.generalForm.invalid) {
      this.spinner = true
      // var formData: any = new FormData();
      // formData.append('country', this.countries[this.generalForm.controls['country'].value])
      // formData.append('state', this.generalForm.controls['state'].value)
      // formData.append('city', this.generalForm.controls['city'].value)
      // formData.append('street', this.generalForm.controls['street'].value)
      // formData.append('zipcode', this.generalForm.controls['zipCode'].value)
      // formData.append('phone_number', this.generalForm.controls['phoneNumber'].value)
      // formData.append('shuttle_phone_number', this.generalForm.controls['shuttleNumber'].value)
      // formData.append('fax_number', this.generalForm.controls['flexNumber'].value)
      // formData.append('shuttle_bus', this.generalForm.controls['shuttleBus'].value)
      // formData.append('user', null)
      const data = {
        "street": this.generalForm.controls['street'].value,
        "city": this.generalForm.controls['city'].value,
        "country": this.countries[this.generalForm.controls['country'].value],
        "state": this.generalForm.controls['state'].value,
        "zipcode": (this.generalForm.controls['zipCode'].value).toString(),
        "phone_number": (this.generalForm.controls['phoneNumber'].value).toString(),
        "shuttle_phone_number": (this.generalForm.controls['shuttleNumber'].value).toString(),
        "fax_number": (this.generalForm.controls['flexNumber'].value).toString(),
        "user": null
      }
      this._detailService.createBasicDetailsService(data).subscribe({
        next: (res) => {
          this.spinner = false
          localStorage.setItem('detailsId', res.id);
          this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        },
        error: (error: HttpErrorResponse) => {
          this.spinner = false
          this._snackbarService.openSnackbar('❌ Internal Server Error')
        }
      })
    }
  }
  onCountryChange(event: any) {
    const selectedCountryCode = this.generalForm.get('country')!.value;
    this.state = this.allState[selectedCountryCode]
  }
  getAllGeneralDetails() {
    console.log('call function')
    this._detailService.getAllBasicDetailsService().subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
      },
      error: (error: HttpErrorResponse) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ Internal Server Error')
      }
    })
  }
  validate(event: any) {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

  //  operating hours
  initForm() {
    this.operatingForm = this.formBuilder.group({
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

  public saveOperatingForm(event: any): void {
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
