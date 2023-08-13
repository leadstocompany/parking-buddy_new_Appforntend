import { Component,NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent {
  
  public routingOption: Array<{ name: string, router: string,active:boolean }> = [
    {
      name: 'Details',
      router: 'Details',
      active:false
    },{
      name: 'Products',
      router: 'Products',
      active:false
    },{
      name: 'Pricing',
      router: 'Pricing',
      active:false
    },{
      name: 'Blackouts',
      router: 'Blackouts',
      active:false
    },{
      name: 'TaxesAndFees',
      router: 'TaxesAndFees',
      active:false
    },{
      name: 'Amenities',
      router: 'Amenities',
      active:false
    },{
      name: 'Descriptions',
      router: 'Descriptions',
      active:false
    },{
      name: 'Images',
      router: 'Images',
      active:false
    },
    {
      name:'Notifications',
      router:'Notifications',
      active:false
    },
    {
      name:'Barcodes',
      router:'Barcodes',
      active:false
    }
  ]

  constructor() { }
  ngOnInit() {

  }

}
