import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';

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
  ngOnInit() {
    console.log(this.modal.temporary)
  }

  submitForm(): void {
    console.log(this.modal)
  }
}