import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-details',
  templateUrl: './single-details.component.html',
  styleUrls: ['./single-details.component.scss']
})
export class SingleDetailsComponent {
  id!: string;
  amenities = [
    { name: 'Parking', iconName: 'local_parking', iconColor: 'green' },
    { name: 'Covered Parking', iconName: 'store_mall_directory', iconColor: 'blue' },
    { name: 'Security Cameras', iconName: 'videocam', iconColor: 'red' },
    // Add more amenities as needed
  ]


  address = '1600 Amphitheatre Parkway, Mountain View, CA 94043';
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Get the value of the 'id' parameter
    });

    // this.geocoder.geocode({
    //   address: this.address
    // }).subscribe((results) => {
    //   console.log(results, 're--------')
    //   // if (results.length > 0) {
    //   //   this.map.setCenter(results[0].geometry.location);
    //   // }
    // });
  }

  typesOfShoes: Array<{ name: string, price: string }> = [
    { name: 'Valet Uncovered', price: '230' }, { name: 'Valet covered', price: '230' },
    { name: 'Valet Uncovered', price: '230' }, { name: 'Valet covered', price: '230' },
    { name: 'Valet Uncovered', price: '230' }, { name: 'Valet covered', price: '230' },
    { name: 'Valet Uncovered', price: '230' }, { name: 'Valet covered', price: '230' }
  ];


  redirectToPayment() {
    this.router.navigate(['/customers/payment', this.id]);
  }



}
