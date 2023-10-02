import { Component } from '@angular/core';
import { AmentitiesService } from 'src/app/service/amentities.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent {

  constructor(private _amenitiesService: AmentitiesService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
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
  editData: any;
  allAmenities: any;
  ameId: any;
  editOption: boolean = false;
  ngOnInit() {
    this.editData = this._saveService.getSharedData()
    //console.log(this.editData, 'edit_____data')
    if (this.editData.edit) {
      this.getAmenities(this.editData.id)
      this.editOption = true
    } else if (this.editData.edit === false) {
      this.getAmenities(this._saveService.getPropertyId())
    }
  }
  onFormSubmit() {
    const data: any = {
      "handicap": false,
      "car_care": false,
      "car_wash": false,
      "security_cameras": false,
      "exterior_fence": false,
      "ev_charging": false,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }
    this.selectedAmenities.forEach(item => {
      if (item.value in data) {
        data[item.value] = true;
      }
    })
    this._amenitiesService.createAmenities(data).subscribe({
      next: (res) => {
        //console.log(res)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        if (this.editData.edit) {
          this.getAmenities(this.editData.id)
        } else {
          this.getAmenities(this._saveService.getPropertyId())
        }
        this.editOption = true
        this.spinner = false
      },
      error: (error) => {
        //console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })
  }

  getAmenities(id: any) {
    //console.log(id, 'update amenetiles')
    this._amenitiesService.getAmenitiesById(id).subscribe({
      next: (res) => {
        this.allAmenities = res
        //console.log(this.allAmenities)
        if (res.length) {
          this.ameId = res[res.length-1].id
        }
        this.setAmenitiesVlue()
      },
      error: (error) => {
        //console.log(error)
      }
    })
  }

  updateSubmit() {
    const data: any = {
      "handicap": false,
      "car_care": false,
      "car_wash": false,
      "security_cameras": false,
      "exterior_fence": false,
      "ev_charging": false,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }
    //console.log('---------updateeeeeeeeeeeeeeeee')
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
        //console.log(res)

        this._snackbarService.openSnackbar('✔ Successfully Updated')
        this.spinner = false
      },
      error: (error) => {
        //console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })
  }


  setAmenitiesVlue() {
    if (this.allAmenities.length) {
      this.selectedAmenities = this.amenities.filter(item => this.allAmenities[this.allAmenities.length-1][item.value] === true);
      if (this.selectedAmenities.length) {
        this.editOption = true
      } else {
        this.editOption = false
      }
    } else {
      this.editOption = false
    }
  }
}
