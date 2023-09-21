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
  constructor(

    private _snackbar: SnackbarService,
    private _customer: CustomerService,
    private _taxeService: TaxesService,
    private route: ActivatedRoute,
    private _route: Router,
    private _docService: DocumentService,
    private _dialog: MatDialog
  ) {

  }
  step = 0;
  ngOnInit() {
    this.getUserDetails()

    const currentTime = new Date();
    this.hours = currentTime.getHours();
    this.minutes = currentTime.getMinutes();
    this.parktime = `${this.minutes > 30 ? this.hours : this.hours - 1}:${this.minutes > 30 ? this.minutes - 30 : 60 + this.minutes - 30}`
    console.log('park==>', this.parktime);


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
    // this._generateUrl()

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

  private _generateUrl() {
    const data = {
      title: this.tittle,
      parkingType: this.type[0]?.product,
      checkIN: `${new Date(this.date.checkIn).toLocaleDateString('en-IN')} - ${this.time.checkIn}`,
      checkOut: `${new Date(this.date.checkOut).toLocaleDateString('en-IN')} - ${this.time.checkOut}`,
      days: this.day,
      subTotal: `${this.icon}${this.day * this.type[0].dail_rate}`,
      serviceCharge: `${this.icon}6.49`,
      taxes: `${this.icon}${this.finaleTaxes}`,
      total: `${this.icon}${((this.day * this.type[0].dail_rate) + 6.49 + this.finaleTaxes).toLocaleString('en-IN')}`,
      download: false,
    }
    this._docService.generateOrderSummary(data, false,this.icon)
    this._createBlob(this._docService.orderSummary as TDocumentDefinitions)
  }

  public _createBlob(docDefination: TDocumentDefinitions) {
    const pdfDocGenerator = pdfMake.createPdf(docDefination);
    pdfDocGenerator.getBlob((blob: Blob) => {
      this.formData.append('order_summary', blob);
    })
  }

  public timeDiffrence(date1: any, date2: any): void {
    const timeDifference = date2 - date1;
    this.day = timeDifference / (1000 * 60 * 60 * 24) + 1;

  }


  public editTimes() {
    const sameDate = this.checkInTime.getTime() === this.checkOutTime.getTime()
    if (sameDate && (parseInt(this.editTime.checkIn.slice(0, 2)) < parseInt(this.parktime.slice(0, 2)))) {
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
      "amount": this.type[0].dail_rate,
      "user": this.userID,
      "property": this.id,
    }
    this._customer.getBookingSlot(this.id).subscribe({
      next: (res) => {
        console.log('res==>', res);
        this._docService.generateOrderSummary(res, true,this.icon)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);

        this._snackbar.openSnackbar('❌ Internal error')
      },
    })
    this._customer.bookingPlot(payload).subscribe({
      next: (res) => {
        console.log(res)
        this._snackbar.openSnackbar('✔ Plot Successfully Booking')
        this._route.navigate(['/customers/thank-you'])
      },
      error: (error) => {
        console.log(error)
        this._snackbar.openSnackbar('❌ enternal error')
      }
    })
  }

  private getUserDetails() {
    this._customer.getProfileDetails().subscribe({
      next: (res) => {
        if (res.role == "normal_user") {
          this.userLogin = true
        }
        console.log(res, 'use details')
        this.userID = res.id
        this.Email = res.email
      },
      error: (error) => {
        console.log(error.error)
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
        } else {
          amountTotal = +this.type[0].dail_rate
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
        console.log(error)
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
    return totalHours
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
}
