import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AmentitiesService } from 'src/app/service/amentities.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-edit-amenities',
  templateUrl: './edit-amenities.component.html',
  styleUrls: ['./edit-amenities.component.scss']
})
export class EditAmenitiesComponent {

  ameId: any;
  constructor(
    private _amenitiesService: AmentitiesService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }
  ngOnInit() {
    this.getAmemnties()
  }
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
      "property": this.data.id
    }
    this.selectedAmenities.forEach(item => {
      if (item.value in data) {
        data[item.value] = true;
      }
    })

    const fd = {
      data: data,
      id: this.ameId
    }

    this._amenitiesService.updateAmenities(fd).subscribe({
      next: (res) => {
        console.log(res)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.spinner = false
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })
  }

  getAmemnties() {
    console.log(this.data.id,'dada')
    this._amenitiesService.getAmenitiesById(this.data.id).subscribe({
      next: (res) => {
        console.log(res, 'responsesss')
        this.ameId = res[0].id
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}
