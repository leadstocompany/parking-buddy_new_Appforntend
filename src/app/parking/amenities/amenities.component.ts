import { Component } from '@angular/core';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent {
  amenities: string[] = ['Handicap','Car Care','Car Wash','Security Cameras','Exterior Fence','EV Charging'];

}
