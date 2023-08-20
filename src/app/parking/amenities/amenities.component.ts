import { Component } from '@angular/core';
import { AmentitiesService } from 'src/app/service/amentities.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent {

  constructor(private _amenitiesService: AmentitiesService, private _snackbarService: SnackbarService) { }
  amenities: Array<{ name: string, image: string, value: string }> = [
    {
      name: 'Handicap',
      image: '/assets/disabled.png',
      value: 'handicap'
    },
    {
      name: 'Car Care',
      value: 'car_care',
      image: '/assets/car.png'
    },
    {
      name: 'Car Wash',
      value: 'car_wash',
      image: '/assets/car-service.png'
    }, {
      name: 'Security Cameras',
      value: 'security_cameras',
      image: '/assets/camra.png'
    },
    {
      name: 'Exterior Fence',
      value: 'exterior_fence',
      image: '/assets/fence.png'
    }, {
      name: 'EV Charging',
      value: 'ev_charging',
      image: '/assets/chargin.png'
    }

  ];
  selectedAmenities: any[] = []; // To store selected amenities
  spinner = false
  onFormSubmit() {
    const data: any = {
      "handicap": false,
      "car_care": false,
      "car_wash": false,
      "security_cameras": false,
      "exterior_fence": false,
      "ev_charging": false,
      "property": localStorage.getItem('detailsId')
    }
    this.selectedAmenities.forEach(item => {
      if (item.value in data) {
        data[item.value] = true;
      }
    })

    this._amenitiesService.createAmenities(data).subscribe({
      next: (res) => {
        console.log(res)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.spinner = false
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false
      }
    })


  }
}
