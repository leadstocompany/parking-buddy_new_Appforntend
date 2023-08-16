import { Component } from '@angular/core';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent {
  amenities: Array<{ name: string, image: string }> = [
    {
      name: 'Handicap',
      image: '/assets/disabled.png'
    },
    {
      name: 'Car Care',
      image: '/assets/car.png'
    },
    {
      name: 'Car Wash',
      image: '/assets/car-service.png'
    }, {
      name: 'Security Cameras',
      image: '/assets/camra.png'
    },
    {
      name: 'Exterior Fence',
      image: '/assets/fence.png'
    }, {
      name: 'EV Charging',
      image: '/assets/chargin.png'
    }

  ];
  selectedAmenities: any[] = []; // To store selected amenities
  onFormSubmit() {
    console.log(this.selectedAmenities);
  }
}
