import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DescriptionsService } from 'src/app/service/descriptions.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.scss']
})
export class DescriptionsComponent {
  public Editor = ClassicEditor;
  public modal = {
    temporary: '',
    checkInInformation: '<p>The lot is located at,Gloucester</p> <p> Please pull right in,An attendant will greet you and assist you.<p><b>Note: All over sized vehicles (example:vehicle/trailer that takes more than one spot) are subject to additional charges to be paid at the lot.</b><p>',
    airportShuttleInformation: '<p>The shuttle operates between 8:00 am and 8:00 pm.</p>',
    pickupInformation: '<p> Upon arrival at the airport, before retrieving your luggage, please call for shuttle pickup Instructions.</p> <p>Once you have your luggage. please proceed to the south end of the passenger terminal building,exit the building,and look for post 15.</p><p>Behind post 15 is a parking a lot where Routes picks up their guests</p>',
    customerFeedback: '',
    emailInstruction: '<p>Thank you for choosing Airport Parking on this trip! </p>',
    safety: true
  }
  editValue: boolean = false
  spinner = false
  editData: any;
  desId: any;
  constructor(private _descriptionService: DescriptionsService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
  ngOnInit() {
    // Check edit or not 
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getDescription(this.editData.id)
    } else if (this.editData.edit === false) {
      this.getDescription(this._saveService.getPropertyId())
    }
  }

  submitForm(): void {
    const data = {
      "temporary_message": this.modal.temporary,
      "checkin_info": this.modal.checkInInformation,
      "shuttle_info": this.modal.airportShuttleInformation,
      "pickup_info": this.modal.pickupInformation,
      "customer_feedback": this.modal.customerFeedback,
      "email_instruction": this.modal.emailInstruction,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }
    this.spinner = true
    this._descriptionService.createDescriptions(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        if (this.editData.edit) {
          this.getDescription(this.editData.id)
        } else {
          this.getDescription(this._saveService.getPropertyId())
        }
      },
      error: (error) => {
        console.log(error)
        this.spinner = false
        this._snackbarService.openSnackbar('❌ Internal Server Error')
      }
    })
  }

  getDescription(id: any) {
    this._descriptionService.getDescriptionsById(id).subscribe({
      next: (res) => {
        if (res.length) {
          this.desId = res[res.length - 1].id
          this.setValue(res[res.length - 1])
          this.editValue = true
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  setValue(data: any) {
    this.modal = {
      temporary: data.temporary_message,
      checkInInformation: data.checkin_info,
      airportShuttleInformation: data.shuttle_info,
      pickupInformation: data.pickup_info,
      customerFeedback: data.customer_feedback,
      emailInstruction: data.email_instruction,
      safety: true
    }
  }


  UpdateValue(): void {
    const data = {
      "temporary_message": this.modal.temporary,
      "checkin_info": this.modal.checkInInformation,
      "shuttle_info": this.modal.airportShuttleInformation,
      "pickup_info": this.modal.pickupInformation,
      "customer_feedback": this.modal.customerFeedback,
      "email_instruction": this.modal.emailInstruction,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }
    this.spinner = true
    const fd = {
      data: data,
      id: this.desId
    }
    this._descriptionService.updateDescriptionsById(fd).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Updated')
      },
      error: (error) => {
        console.log(error)
        this.spinner = false
        this._snackbarService.openSnackbar('❌ Internal Server Error')
      }
    })
  }
}