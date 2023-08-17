import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import data from './country.json'
import countryState from './country-states.json'
import { DetailsService } from 'src/app/service/details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/service/snackbar.service';
interface Country {
  [code: string]: string;
};
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  generalForm!: FormGroup
  country: Array<string> = data.country;
  countries: Country = countryState.country;
  allState: any = countryState.states;
  state: any = this.allState['IN'];
  spinner: boolean = false
  constructor(private formBuilder: FormBuilder, private _detailService: DetailsService, private _snackbarService: SnackbarService) { }
  ngOnInit() {
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
}
