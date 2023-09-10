import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { DocumentService } from 'src/app/service/docs/document.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TaxesService } from 'src/app/service/taxes.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

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
  Email: any = ''
  userID: any = ''
  public editTime: any = {
    "checkIn": "13:15",
    "checkOut": "05:20"
  }
  constructor(
    private _snackbar: SnackbarService,
    private _customer: CustomerService,
    private _taxeService: TaxesService,
    private route: ActivatedRoute,
    private _route: Router,
    private _docService: DocumentService
  ) {

  }
  step = 0;
  ngOnInit() {
    this.getUserDetails()
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
    this._generateUrl()

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
    this._docService.generateOrderSummary(data)
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
    this.time = {
      "checkIn": this.editTime.checkIn,
      "checkOut": this.editTime.checkOut
    }
    this.timeDiffrence(new Date(this.date.checkIn), new Date(this.date.checkOut))
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
      download: true,
    }
    this._docService.generateOrderSummary(data)
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
        console.log(res, 'use details')
        this.userID = res.id
        this.Email = res.email
      },
      error: (error) => {
        this._snackbar.openSnackbar('❌ enternal error')
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
        const totalHours = this.getTotalHourse(this.time.checkIn, this.time.checkOut)
        res.forEach((taxeS: any) => {
          if (taxeS.apply = "post_tax") {
            if (taxeS.type == "fixed_amount") {
              if (taxeS.amount_type = "Percentage") {
                const taxes = (+this.type[0].dail_rate) * ((+taxeS.amount) / 100)
                this.singleTRupe = this.day * taxes
              } else {
                const taxes = +taxeS.amount
                this.singleTRupe = this.day * taxes
              }
            } else if (taxeS.type == 'per_day') {
              if (taxeS.amount_type = "Percentage") {
                let taxes = (1 * (+this.type[0].dail_rate)) * ((+taxeS.amount) / 100)
                taxes = this.day * taxes
                this.singleTRupe = taxes
              } else {
                let taxes = +taxeS.amount
                taxes = this.day * taxes
                this.singleTRupe = taxes
              }
            } else if (taxeS.type == 'per_calendar_day') {
              const totalCalenderHours = this.day * 24 - totalHours
              const calenderDay = Math.floor(totalCalenderHours / 24)
              if (taxeS.amount_type = "Percentage") {
                let taxes = (1 * (+this.type[0].dail_rate)) * ((+taxeS.amount) / 100)
                taxes = calenderDay * taxes
                this.singleTRupe = taxes
              } else {
                let taxes = +taxeS.amount
                taxes = calenderDay * taxes
                this.singleTRupe = taxes
              }
            }
            this.finaleTaxes += +this.singleTRupe
            console.log(this.finaleTaxes, '2222252551dfadkfsjaafl2525')
          } else {
            if (taxeS.type == "fixed_amount") {
              if (taxeS.amount_type = "Percentage") {
                const taxes = (this.day * (+this.type[0].dail_rate)) * ((+taxeS.amount) / 100)
                this.singleTRupe = taxes
              } else {
                const taxes = +taxeS.amount
                this.singleTRupe = taxes
              }
            } else if (taxeS.type == 'per_day') {
              if (taxeS.amount_type = "Percentage") {
                let taxes = (1 * (+this.type[0].dail_rate)) * ((+taxeS.amount) / 100)
                taxes = this.day * taxes
                this.singleTRupe = taxes
              } else {
                let taxes = +taxeS.amount
                taxes = this.day * taxes
                this.singleTRupe = taxes
              }
            } else if (taxeS.type == 'per_calendar_day') {
              const totalCalenderHours = this.day * 24 - totalHours
              const calenderDay = Math.floor(totalCalenderHours / 24)
              if (taxeS.amount_type = "Percentage") {
                let taxes = (1 * (+this.type[0].dail_rate)) * ((+taxeS.amount) / 100)
                taxes = calenderDay * taxes
                this.singleTRupe = taxes
              } else {
                let taxes = +taxeS.amount
                taxes = calenderDay * taxes
                this.singleTRupe = taxes
              }
            }
            this.finaleTaxes = +this.singleTRupe
            console.log(this.finaleTaxes, '85858595585545fdsafadsfadff')
          }
        });
      },
      error: (error) => {
        console.log(error)
      }
    })
  }



  public getTotalHourse(time1: any, time2: any) {
    // Split the times into hours and minutes
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);
    // Convert both times to minutes
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;
    // Calculate the time difference in minutes
    const timeDifferenceMinutes = totalMinutes2 - totalMinutes1;
    // Convert the time difference back to hours and minutes
    const totalHours = Math.floor(timeDifferenceMinutes / 60);
    const remainingMinutes = timeDifferenceMinutes % 60;
    return totalHours
  }
}
