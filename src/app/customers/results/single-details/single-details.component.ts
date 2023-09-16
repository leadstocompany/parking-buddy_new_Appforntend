import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import currency from '../../../parking/ACurrency.json'
import { TaxesService } from 'src/app/service/taxes.service';
@Component({
  selector: 'app-single-details',
  templateUrl: './single-details.component.html',
  styleUrls: ['./single-details.component.scss']
})
export class SingleDetailsComponent {
  id!: string;
  currency: any = currency?.currency
  public date!: { checkIn: Date, checkOut: Date }
  // checkOutTime: string = new Date().toISOString().split('T')[0];
  // checkInTime: string = new Date().toISOString().split('T')[0];
  checkInTime: Date = new Date()
  checkOutTime: Date = new Date()

  // public minCheckInDate: string = ''
  // public minCheckOutDate: string = ''
  public minCheckInDate: Date = new Date();
  public minCheckOutDate: Date = new Date();
  amenities = [
    { iconName: 'accessible', iconColor: 'black', name: 'Handicap', key: 'handicap' },
    { iconName: 'drive_eta', iconColor: 'green', name: 'Car Care', key: 'car_care' },
    { iconName: 'local_car_wash', iconColor: 'blue', name: 'Car Wash', key: 'car_wash' },
    { iconName: 'security', iconColor: 'orange', name: 'Security Cameras', key: 'security_cameras' },
    { iconName: 'fence', iconColor: 'purple', name: 'Exterior Fence', key: 'exterior_fence' },
    { iconName: 'ev_station', iconColor: 'teal', name: 'EV Charging', key: 'ev_charging' }
  ];
  Images: any = []

  address = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
  parkingTimes: { checkIn: string, checkOut: string } = {
    checkIn: '10:00',
    checkOut: '10:00',
  }
  parkingType!: any;
  value: any;
  constructor(private _taxeService: TaxesService, private route: ActivatedRoute, private router: Router, private _customerService: CustomerService) { }
  ngOnInit() {
    // const date = new Date();
    // this.minCheckInDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
    // this.minCheckOutDate = this.minCheckInDate

    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the value of the 'id' parameter
      // this.getText(params['id'])
    });
    this.route.queryParams.subscribe((queryParams) => {
      this.date = {
        checkIn: queryParams['checkIn'],
        checkOut: queryParams['checkout']
      }
      this.checkInTime = new Date(this.date.checkIn)
      this.checkOutTime = new Date(this.date.checkOut)
    });
    console.log(this.checkInTime)
    this.getSingleIdDetails()
    // this.geocoder.geocode({
    //   address: this.address
    // }).subscribe((results) => {
    //   console.log(results, 're--------')
    //   // if (results.length > 0) {
    //   //   this.map.setCenter(results[0].geometry.location);
    //   // }
    // });
  }

  typesOfShoes: any = [
    { name: 'Valet Uncovered', price: '230' }, { name: 'Valet covered', price: '230' },
  ];


  redirectToPayment() {
    console.log(this.parkingType)
    const queryParams = {
      parkingTimes: JSON.stringify(this.parkingTimes),
      parkingType: JSON.stringify(this.parkingType),
      checkOutDate: this.checkOutTime,
      checkInDate: this.checkInTime,
      title: this.value.tittle ? this.value.tittle : '',
      icon: this.currency[this.value.country] ? this.currency[this.value.country] : '$'
    }
    this.router.navigate(['/customers/payment', this.id], { queryParams });
  }


  getSingleIdDetails() {
    this._customerService.singleAllDetails(this.id).subscribe({
      next: (res) => {
        console.log(res)
        this.value = res
        this.Images = res?.property_logo[0]?.image_by_logo
        this.amenities = this.amenities.filter((icon) => res.property_amenities[0][icon.key] === true)
        this.typesOfShoes = res?.property_pricing
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  isStep1Completed = false;
  selectedStep = 0; // Track the currently selected step
  onNextStep() {
    if (this.isStep1Completed) {
      this.selectedStep = 1; // Advance to step 2 (index 1)
    }
  }

  // // get tex 
  // public getText(id:any) {
  //   console.log(id,'dsfadsaf000000000000000000000000000000000')
  //   this._taxeService.getTaxesfeesById(id).subscribe({
  //     next: (res) => {
  //       console.log(res, 'get taxes 88888888888888888888---')
  //     },
  //     error: (error) => {
  //       console.log(error)
  //     }
  //   })
  // }
  public checkOutDate(): void {
    const date = new Date(this.checkInTime);
    this.minCheckOutDate = date;
    this.checkOutTime = date;
  }
}
