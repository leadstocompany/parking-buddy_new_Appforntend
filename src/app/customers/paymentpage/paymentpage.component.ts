import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private route: ActivatedRoute, private _route: Router) {

  }
  step = 0;
  ngOnInit() {
    this.setStep(0)
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the value of the 'id' parameter
      console.log(this.id)
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
}
