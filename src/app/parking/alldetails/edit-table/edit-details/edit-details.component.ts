import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import countryState from 'src/app/parking/details/general/country-states.json'
import { DetailsService } from 'src/app/service/details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  public changeIndex(index: number) {
    this.selectedTabIndex = +index
  }

  public country_codes: any = {
    "Afghanistan": "AF",
    "land Islands": "AX",
    "Albania": "AL",
    "Algeria": "DZ",
    "American Samoa": "AS",
    "AndorrA": "AD",
    "Angola": "AO",
    "Anguilla": "AI",
    "Antarctica": "AQ",
    "Antigua and Barbuda": "AG",
    "Argentina": "AR",
    "Armenia": "AM",
    "Aruba": "AW",
    "Australia": "AU",
    "Austria": "AT",
    "Azerbaijan": "AZ",
    "Bahamas": "BS",
    "Bahrain": "BH",
    "Bangladesh": "BD",
    "Barbados": "BB",
    "Belarus": "BY",
    "Belgium": "BE",
    "Belize": "BZ",
    "Benin": "BJ",
    "Bermuda": "BM",
    "Bhutan": "BT",
    "Bolivia": "BO",
    "Bosnia and Herzegovina": "BA",
    "Botswana": "BW",
    "Bouvet Island": "BV",
    "Brazil": "BR",
    "British Indian Ocean Territory": "IO",
    "Brunei Darussalam": "BN",
    "Bulgaria": "BG",
    "Burkina Faso": "BF",
    "Burundi": "BI",
    "Cambodia": "KH",
    "Cameroon": "CM",
    "Canada": "CA",
    "Cape Verde": "CV",
    "Cayman Islands": "KY",
    "Central African Republic": "CF",
    "Chad": "TD",
    "Chile": "CL",
    "China": "CN",
    "Christmas Island": "CX",
    "Cocos (Keeling) Islands": "CC",
    "Colombia": "CO",
    "Comoros": "KM",
    "Congo": "CG",
    "Congo, The Democratic Republic of the": "CD",
    "Cook Islands": "CK",
    "Costa Rica": "CR",
    "Cote D'Ivoire": "CI",
    "Croatia": "HR",
    "Cuba": "CU",
    "Cyprus": "CY",
    "Czech Republic": "CZ",
    "Denmark": "DK",
    "Djibouti": "DJ",
    "Dominica": "DM",
    "Dominican Republic": "DO",
    "Ecuador": "EC",
    "Egypt": "EG",
    "El Salvador": "SV",
    "Equatorial Guinea": "GQ",
    "Eritrea": "ER",
    "Estonia": "EE",
    "Ethiopia": "ET",
    "Falkland Islands (Malvinas)": "FK",
    "Faroe Islands": "FO",
    "Fiji": "FJ",
    "Finland": "FI",
    "France": "FR",
    "French Guiana": "GF",
    "French Polynesia": "PF",
    "French Southern Territories": "TF",
    "Gabon": "GA",
    "Gambia": "GM",
    "Georgia": "GE",
    "Germany": "DE",
    "Ghana": "GH",
    "Gibraltar": "GI",
    "Greece": "GR",
    "Greenland": "GL",
    "Grenada": "GD",
    "Guadeloupe": "GP",
    "Guam": "GU",
    "Guatemala": "GT",
    "Guernsey": "GG",
    "Guinea": "GN",
    "Guinea-Bissau": "GW",
    "Guyana": "GY",
    "Haiti": "HT",
    "Heard Island and Mcdonald Islands": "HM",
    "Holy See (Vatican City State)": "VA",
    "Honduras": "HN",
    "Hong Kong": "HK",
    "Hungary": "HU",
    "Iceland": "IS",
    "India": "IN",
    "Indonesia": "ID",
    "Iran, Islamic Republic Of": "IR",
    "Iraq": "IQ",
    "Ireland": "IE",
    "Isle of Man": "IM",
    "Israel": "IL",
    "Italy": "IT",
    "Jamaica": "JM",
    "Japan": "JP",
    "Jersey": "JE",
    "Jordan": "JO",
    "Kazakhstan": "KZ",
    "Kenya": "KE",
    "Kiribati": "KI",
    "Korea, Democratic People'S Republic of": "KP",
    "Korea, Republic of": "KR",
    "Kuwait": "KW",
    "Kyrgyzstan": "KG",
    "Lao People'S Democratic Republic": "LA",
    "Latvia": "LV",
    "Lebanon": "LB",
    "Lesotho": "LS",
    "Liberia": "LR",
    "Libyan Arab Jamahiriya": "LY",
    "Liechtenstein": "LI",
    "Lithuania": "LT",
    "Luxembourg": "LU",
    "Macao": "MO",
    "Macedonia, The Former Yugoslav Republic of": "MK",
    "Madagascar": "MG",
    "Malawi": "MW",
    "Malaysia": "MY",
    "Maldives": "MV",
    "Mali": "ML",
    "Malta": "MT",
    "Marshall Islands": "MH",
    "Martinique": "MQ",
    "Mauritania": "MR",
    "Mauritius": "MU",
    "Mayotte": "YT",
    "Mexico": "MX",
    "Micronesia, Federated States of": "FM",
    "Moldova, Republic of": "MD",
    "Monaco": "MC",
    "Mongolia": "MN",
    "Montenegro": "ME",
    "Montserrat": "MS",
    "Morocco": "MA",
    "Mozambique": "MZ",
    "Myanmar": "MM",
    "Namibia": "NA",
    "Nauru": "NR",
    "Nepal": "NP",
    "Netherlands": "NL",
    "Netherlands Antilles": "AN",
    "New Caledonia": "NC",
    "New Zealand": "NZ",
    "Nicaragua": "NI",
    "Niger": "NE",
    "Nigeria": "NG",
    "Niue": "NU",
    "Norfolk Island": "NF",
    "Northern Mariana Islands": "MP",
    "Norway": "NO",
    "Oman": "OM",
    "Pakistan": "PK",
    "Palau": "PW",
    "Palestinian Territory, Occupied": "PS",
    "Panama": "PA",
    "Papua New Guinea": "PG",
    "Paraguay": "PY",
    "Peru": "PE",
    "Philippines": "PH",
    "Pitcairn": "PN",
    "Poland": "PL",
    "Portugal": "PT",
    "Puerto Rico": "PR",
    "Qatar": "QA",
    "Reunion": "RE",
    "Romania": "RO",
    "Russian Federation": "RU",
    "RWANDA": "RW",
    "Saint Helena": "SH",
    "Saint Kitts and Nevis": "KN",
    "Saint Lucia": "LC",
    "Saint Pierre and Miquelon": "PM",
    "Saint Vincent and the Grenadines": "VC",
    "Samoa": "WS",
    "San Marino": "SM",
    "Sao Tome and Principe": "ST",
    "Saudi Arabia": "SA",
    "Senegal": "SN",
    "Serbia": "RS",
    "Seychelles": "SC",
    "Sierra Leone": "SL",
    "Singapore": "SG",
    "Slovakia": "SK",
    "Slovenia": "SI",
    "Solomon Islands": "SB",
    "Somalia": "SO",
    "South Africa": "ZA",
    "South Georgia and the South Sandwich Islands": "GS",
    "Spain": "ES",
    "Sri Lanka": "LK",
    "Sudan": "SD",
    "Suriname": "SR",
    "Svalbard and Jan Mayen": "SJ",
    "Swaziland": "SZ",
    "Sweden": "SE",
    "Switzerland": "CH",
    "Syrian Arab Republic": "SY",
    "Taiwan, Province of China": "TW",
    "Tajikistan": "TJ",
    "Tanzania, United Republic of": "TZ",
    "Thailand": "TH",
    "Timor-Leste": "TL",
    "Togo": "TG",
    "Tokelau": "TK",
    "Tonga": "TO",
    "Trinidad and Tobago": "TT",
    "Tunisia": "TN",
    "Turkey": "TR",
    "Turkmenistan": "TM",
    "Turks and Caicos Islands": "TC",
    "Tuvalu": "TV",
    "Uganda": "UG",
    "Ukraine": "UA",
    "United Arab Emirates": "AE",
    "United Kingdom": "GB",
    "United States": "US",
    "United States Minor Outlying Islands": "UM",
    "Uruguay": "UY",
    "Uzbekistan": "UZ",
    "Vanuatu": "VU",
    "Venezuela": "VE",
    "Viet Nam": "VN",
    "Virgin Islands, British": "VG",
    "Virgin Islands, U.S.": "VI",
    "Wallis and Futuna": "WF",
    "Western Sahara": "EH",
    "Yemen": "YE",
    "Zambia": "ZM",
    "Zimbabwe": "ZW"
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
  constructor(private formBuilder: FormBuilder,
    private _detailService: DetailsService,
    private _snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<EditDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any

  ) { }
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

    this.getSingleValues();
  }
  public saveForm(event: any) {
    this.validate(event)
    if (!this.generalForm.invalid) {
      this.spinner = true
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

      let fd = {
        data: data,
        id: this.data.id
      }
      this._detailService.createBasicDetailsService(fd).subscribe({
        next: (res) => {
          this.spinner = false
          localStorage.setItem('detailsId', res.id);
          this._snackbarService.openSnackbar('✔ Form Successfully Updated')
        },
        error: (error:any) => {
          this.spinner = false
          this._snackbarService.openSnackbar('❌ '+error.error[0])
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
      error: (error:any) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ '+error.error[0])
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
    this.spinner = true
    const data = {
      data: {
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
      id: this.data.id
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
        this._snackbarService.openSnackbar('❌ '+error.error[0])
      }
    })
  }
  get value() {
    return this.operatingForm.get('operationHours')?.value;
  }
  /**
   * Get single product
   */

  getSingleValues() {
    this._detailService.getSingleBasicDetailsService(this.data.id).subscribe({
      next: (res) => {
        console.log(res, 'single data')
        this.spinner = false
        this.setValues(res)
      },
      error: (error:any) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ '+error.error[0])
      }
    })
  }

  setValues(data: any) {
    this.generalForm.setValue({
      street: data.street,
      city: data.city,
      country: this.country_codes[`${data.country}`],
      state: data.state,
      zipCode: data.zipcode,
      phoneNumber: data.phone_number,
      shuttleNumber: data.shuttle_phone_number,
      flexNumber: data.fax_number,
      shuttleBus: data.shuttle_phone_number
    });

    this.operatingForm.setValue({
      operationHours: !data.all_days ? 'limited' : '24/7',
      openTime0: data.monday_open_time,
      openTime1: data.tuesday_open_time,
      openTime2: data.wednesday_open_time,
      openTime3: data.thursday_open_time,
      openTime4: data.friday_open_time,
      openTime5: data.saturday_open_time,
      openTime6: data.sunday_open_time,
      closeTime0: data.monday_close_time,
      closeTime1: data.tuesday_close_time,
      closeTime2: data.wednesday_close_time,
      closeTime3: data.thursday_close_time,
      closeTime4: data.friday_close_time,
      closeTime5: data.saturday_close_time,
      closeTime6: new Date().toTimeString(),
    })
  }


}
