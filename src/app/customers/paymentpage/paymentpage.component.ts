import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { DocumentService } from 'src/app/service/docs/document.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TaxesService } from 'src/app/service/taxes.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { QuickSignInComponent } from './quick-sign-in/quick-sign-in.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth/auth.service';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.scss']
})
export class PaymentpageComponent {
  public formData = new FormData();
  public date: any;
  public time: any;
  public type: any; // this type is a product type of the price data
  public id: any;
  public day: any;
  public tittle: any;
  public icon: any;
  public userLogin: boolean = false;
  public verifyUser: boolean = false;
  public base_title!: any;
  public base_charge!: any;
  public total_time_title!: any;
  public total_time_charge !: any;
  Email: any = ''
  userID: any = ''
  hours = 0
  minutes = 0
  parktime = ''
  public editTime: any = {
    "checkIn": "13:15",
    "checkOut": "05:20"
  }
  minDate: Date = new Date(); // Initialize with the current date
  // this is a check in date 
  checkInTime: Date = new Date()
  checkOutTime: Date = new Date()
  public minCheckInDate: Date = new Date();
  public minCheckOutDate: Date = new Date();

  // spinners 
  send_otp_spinner: boolean = false;
  download_pdf_spinner: boolean = false;
  constructor(
    private _snackbar: SnackbarService,
    private _customer: CustomerService,
    private _taxeService: TaxesService,
    private route: ActivatedRoute,
    private _route: Router,
    private _docService: DocumentService,
    private _dialog: MatDialog,
    private _authService: AuthService
  ) {

  }
  step = 0;
  ngOnInit() {
    this.getUserDetails()
    const currentTime = new Date();
    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.parktime = `${this.minutes > 30 ? this.hours : this.hours - 1}:${this.minutes > 30 ? this.minutes - 30 : 60 + this.minutes - 30}`
    this.setStep(0)
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the value of the 'id' parameter
      this.getText(params['id'])
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.date = {
        checkIn: queryParams['checkInDate'],
        checkOut: queryParams['checkOutDate']
      }
      this.checkInTime = new Date(queryParams['checkInDate'])
      this.checkOutTime = new Date(queryParams['checkOutDate'])
      this.time = JSON.parse(queryParams['parkingTimes'])
      this.type = JSON.parse(queryParams['parkingType'])
      this.editTime = {
        "checkIn": this.time.checkIn,
        "checkOut": this.time.checkOut
      }
      this.timeDiffrence(new Date(this.date.checkIn), new Date(this.date.checkOut))
      this.tittle = queryParams['title']
      this.icon = queryParams['icon']
    })
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }

  public _createBlob(docDefination: TDocumentDefinitions) {
    const pdfDocGenerator = pdfMake.createPdf(docDefination);
    pdfDocGenerator.getBlob((blob: Blob) => {
      this.formData.append('order_summary', blob);
    })
  }

  public timeDiffrence(date1: any, date2: any): void {
    const timeDifference = date2 - date1;
    this.day = Math.ceil(timeDifference / (1000 * 60 * 60 * 24) + 1);

  }


  public editTimes() {
    const toDayDate = new Date()
    // const sameDate = this.checkInTime.getTime() === this.checkOutTime.getTime()
    const sameDate = this.checkToDate(new Date(this.checkInTime), new Date(this.checkOutTime))
    if (this.checkToDate(toDayDate, new Date(this.checkInTime)) && this.convertToSeconds(this.editTime.checkIn) < this.convertToSeconds(this.parktime)) {
      this._snackbar.openSnackbar(`❌ Check-In Time Should be greater than ${this.parktime}`)
      return
    }
    if (sameDate && parseInt(this.editTime.checkIn.slice(0, 2)) >= parseInt(this.editTime.checkOut.slice(0, 2))) {
      this._snackbar.openSnackbar(`❌ Check-Out Time Should be greater than ${this.editTime.checkIn}`)
      return
    } else {
      this.time = {
        "checkIn": this.editTime.checkIn,
        "checkOut": this.editTime.checkOut
      }
      this.date = {
        checkIn: this.checkInTime,
        checkOut: this.checkOutTime
      }
      this.timeDiffrence(new Date(this.date.checkIn), new Date(this.date.checkOut))
      this.getText(this.id)

    }
  }

  public submitForm() {
    let payload: any = {
      "parking_type": this.type[0]?.product,
      "guest_email": this.Email,
      "check_in_date": this.date.checkIn,
      'check_in_time': this.time.checkIn,
      "check_out_date": this.date.checkOut,
      "check_out_time": this.time.checkOut,
      "amount": ((this.day * this.type[0].dail_rate) + 6.49 + this.finaleTaxes).toFixed(2),
      "user": this.userID,
      "property": this.id,
      "no_of_days": this.day,
      "base_price": (this.day * this.type[0].dail_rate).toFixed(),
      "service_charge": "6.49",
      "taxesandfees": this.finaleTaxes.toFixed(2),
    }
    this._customer.bookingPlot(payload).subscribe({
      next: (response) => {
        //console.log(response, 'response')
        this._customer.getBookingSlot(response.id).subscribe({
          next: (res) => {
            this._docService.generateOrderSummary(res, true, this.icon)
            this._snackbar.openSnackbar('✔ Plot Successfully Booking')
            this._route.navigate(['/customers/thank-you'])
          },
          error: (error: HttpErrorResponse) => {
            //console.log(error);
            this._snackbar.openSnackbar('❌' + error.error[0])
          },
        })
      },
      error: (error) => {
        //console.log(error)
        this._snackbar.openSnackbar('❌ ' + error.error[0])
      }
    })
  }

  private getUserDetails() {
    this._customer.getProfileDetails().subscribe({
      next: (res) => {
        if (res.role == "normal_user") {
          this.userLogin = true
        }
        this.userID = res.id
        this.Email = res.email
      },
      error: (error) => {
        if (error.error[0]) {
          this._snackbar.openSnackbar('❌ ' + error.error[0])
        }

      }
    }
    )
  }
  // get tex 
  public taxeS: any;
  public singleTRupe: any;
  public finaleTaxes: number = 0;
  public getText(id: any) {
    this._taxeService.getTaxesfeesById(id).subscribe({
      next: (res) => {
        const hours = this.totalHoursBtwDates(this.date, this.editTime)
        let amountTotal: number = 0
        if (hours < 24 && +this.type[0].hourly_rate) {
          amountTotal = +this.type[0].hourly_rate
          this.base_title = 'Hourly Rate'
          this.total_time_title = 'Total Hours'
          this.total_time_charge = hours
          this.base_charge = +this.type[0].hourly_rate

        } else {
          amountTotal = +this.type[0].dail_rate
          this.base_title = 'Daily Rate'
          this.total_time_title = 'Total Days'
          this.total_time_charge = this.day
          this.base_charge = +this.type[0].dail_rate
        }
        this.finaleTaxes = 0
        res.forEach((tax: any) => {
          if (tax.type == "fixed_amount") {
            if (tax.amount_type == "Fixed") {
              this.finaleTaxes += +tax.amount
            } else {
              const totalAmount = +this.day * amountTotal
              this.finaleTaxes += +totalAmount * Number(+tax.amount / 100)
            }
          } else if (tax.type == 'per_day') {
            const totalCalenderHours = this.totalHoursBtwDates(this.date, this.editTime)
            const calenderDay = Math.ceil(+totalCalenderHours / 24)
            if (tax.amount_type == "Percentage") {
              let oneDayTax = (1 * (amountTotal)) * ((+tax.amount) / 100)
              let totalDayTax = +calenderDay * +oneDayTax
              this.finaleTaxes += +totalDayTax
            } else {
              let oneDayTax = +tax.amount
              let totalDayTax = +calenderDay * +oneDayTax
              this.finaleTaxes += +totalDayTax
            }
          } else if (tax.type == 'per_calendar_day') {
            if (tax.amount_type == "Percentage") {
              let oneDayTax = (1 * (amountTotal)) * ((+tax.amount) / 100)
              let totalDayTax = +this.day * +oneDayTax
              this.finaleTaxes += totalDayTax
            } else {
              let oneDayTax = +tax.amount
              let totalDayTax = +this.day * +oneDayTax
              this.finaleTaxes += +totalDayTax
            }
          }
        })

      },
      error: (error) => {
        //console.log(error)
        this._snackbar.openSnackbar('❌ ' + error.error[0])
      }
    })
  }


  /**
   * @description
   * 
   */

  totalHoursBtwDates(date: any, time: any): any {
    // Define the check-in and check-out times and dates as strings
    const checkInTime = this.convertTimeFormat(time.checkIn);
    const checkOutTime = this.convertTimeFormat(time.checkOut);
    const checkInDate = new Date(date.checkIn).toISOString().split('T')[0];
    const checkOutDate = new Date(date.checkOut).toISOString().split('T')[0];
    // Convert the time strings to JavaScript Date objects
    const checkInDateTime: any = new Date(`${checkInDate}T${checkInTime}:00`);
    const checkOutDateTime: any = new Date(`${checkOutDate}T${checkOutTime}:00`);
    // Calculate the time difference in milliseconds
    const timeDifferenceMillis: any = checkOutDateTime - checkInDateTime;
    // Convert milliseconds to hours
    const totalHours = timeDifferenceMillis / (1000 * 60 * 60);
    return Math.ceil(totalHours)
  }

  convertTimeFormat(time: any) {
    // Split the input time string into hours and minutes
    const [hours, minutes] = time.split(':');
    // Pad the hours and minutes with leading zeros if necessary
    const paddedHours = hours.padStart(2, '0');
    const paddedMinutes = minutes.padStart(2, '0');
    // Combine the padded hours and minutes into the new format
    const formattedTime = `${paddedHours}:${paddedMinutes}`;
    return formattedTime;
  }

  public quickSignInDialog(): void {
    const dialogRef = this._dialog.open(QuickSignInComponent, {
      autoFocus: false,
      disableClose: true,
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      this.ngOnInit()
    })
  }

  public checkOutDate(): void {
    const date = new Date(this.checkInTime);
    this.minCheckOutDate = date;
    this.checkOutTime = date;
  }

  onOpenCalendar(container: any) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }



  verifyEmail(): void {
    if (this.Email != '') {
      this.send_otp_spinner = true
      this._authService.guestEmailVerifySendOtp({ email: this.Email }).subscribe({
        next: (res) => {
          if (res.message) {
            this._snackbar.openSnackbar('✔ ' + res.message)
            this.send_otp_spinner = false
            this.verifyOtpModal()
          } else {
            this.send_otp_spinner = false
            this._snackbar.openSnackbar('✔ ' + res.error)
          }
        },
        error: (error) => {
          this.send_otp_spinner = false
          //console.log(error)
          this._snackbar.openSnackbar('❌' + error.error.error)
        },
      })
    } else {
      this._snackbar.openSnackbar('Enter Your Email !')
    }
  }


  public verifyOtpModal(): void {
    const dialogRef = this._dialog.open(VerifyOtpComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        email: this.Email,
        customerUser: true,
      }
    })

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.verify) {
        this.verifyUser = true
        this.send_otp_spinner = false
      }
    })
  }

  convertToSeconds(timeString: any) {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
  }

  checkToDate(today: any, dateToCheck: any) {
    console.log(today, dateToCheck, 'dateToCheck')
    if (
      today.getFullYear() === dateToCheck.getFullYear() &&
      today.getMonth() === dateToCheck.getMonth() &&
      today.getDate() === dateToCheck.getDate()
    ) {
      return true
    } else {
      return false
    }
  }
}
