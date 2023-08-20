import { Component } from '@angular/core';

@Component({
  selector: 'app-create-parking-plot',
  templateUrl: './create-parking-plot.component.html',
  styleUrls: ['./create-parking-plot.component.scss']
})
export class CreateParkingPlotComponent {
  public routingOption: Array<{ name: string, router: string, active: boolean }> = [
    {
      name: 'Calender',
      router: 'Calender',
      active: false
    },
    {
      name: 'Details',
      router: 'Details',
      active: false
    }, {
      name: 'Products',
      router: 'Products',
      active: false
    }, {
      name: 'Pricing',
      router: 'Pricing',
      active: false
    }, {
      name: 'Blackouts',
      router: 'Blackouts',
      active: false
    }, {
      name: 'TaxesAndFees',
      router: 'TaxesAndFees',
      active: false
    }, {
      name: 'Amenities',
      router: 'Amenities',
      active: false
    }, {
      name: 'Descriptions',
      router: 'Descriptions',
      active: false
    }, {
      name: 'Images',
      router: 'Images',
      active: false
    },
    {
      name: 'Notifications',
      router: 'Notifications',
      active: false
    },
    {
      name: 'Barcodes',
      router: 'Barcodes',
      active: false
    }
  ]
}
