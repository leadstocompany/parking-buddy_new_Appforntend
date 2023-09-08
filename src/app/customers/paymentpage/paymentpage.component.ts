import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxesService } from 'src/app/service/taxes.service';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.scss']
})
export class PaymentpageComponent {
  public date: any;
  public time: any;
  public type: any;
  public id: any;
  public day: any;
  public tittle: any;
  public icon: any;
  public editTime: any = {
    "checkIn": "13:15",
    "checkOut": "05:20"
  }
  constructor(private _taxeService: TaxesService, private route: ActivatedRoute, private _route: Router) {

  }
  step = 0;
  ngOnInit() {
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
      console.log(this.type, 'thdskjhfakhdska')
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
    this._route.navigate(['/customers/thank-you'])
  }

  // get tex 

  public taxeS: any;
  public singleTRupe: any;
  public finaleTaxes: number=0;
  public getText(id: any) {
    this._taxeService.getTaxesfeesById(id).subscribe({
      next: (res) => {
        const totalHours = this.getTotalHourse(this.time.checkIn, this.time.checkOut)
        res.forEach((taxeS:any) => {
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
