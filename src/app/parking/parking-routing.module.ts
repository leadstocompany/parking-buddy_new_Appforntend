import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ProductsComponent } from './products/products.component';
import { ParkingComponent } from './parking.component';
import { BarcodesComponent } from './barcodes/barcodes.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ImagesComponent } from './images/images.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { TaxesComponent } from './taxes/taxes.component';
import { BlackoutsComponent } from './blackouts/blackouts.component';
import { PricingComponent } from './pricing/pricing.component';
import { GeneralComponent } from './details/general/general.component';
import { OperatingHoursComponent } from './details/operating-hours/operating-hours.component';
import { ShuttleHoursComponent } from './details/shuttle-hours/shuttle-hours.component';
import { AllBlackoutsComponent } from './blackouts/all-blackouts/all-blackouts.component';
import { SettingComponent } from './blackouts/setting/setting.component';
import { CalenderComponent } from './calender/calender.component';
import { CreateParkingPlotComponent } from './create-parking-plot/create-parking-plot.component';
import { AlldetailsComponent } from './alldetails/alldetails.component';
const routes: Routes = [
  {
    path: '', component: ParkingComponent, children: [
      { path: '', component: AlldetailsComponent },
      {
        path: 'create', component: CreateParkingPlotComponent, children: [
          { path: '', redirectTo: "Calender", pathMatch: 'full' },
          { path: 'Calender', component: CalenderComponent },
          {
            path: 'Details', component: DetailsComponent, children: [
              {
                path: '', redirectTo: 'General', pathMatch: 'full'
              },
              {
                path: 'General', component: GeneralComponent
              },
              {
                path: 'OperatingHours',
                component: OperatingHoursComponent
              },
              {
                path: 'ShuttleHours',
                component: ShuttleHoursComponent
              }
            ]
          },
          { path: 'Products', component: ProductsComponent },
          { path: 'Pricing', component: PricingComponent },
          {
            path: 'Blackouts', component: BlackoutsComponent, children: [
              {
                path: '', redirectTo: 'AllBlackouts', pathMatch: 'full'
              },
              {
                path: 'AllBlackouts', component: AllBlackoutsComponent
              },
              {
                path: 'Setting', component: SettingComponent
              }
            ]
          },
          { path: 'TaxesAndFees', component: TaxesComponent },
          { path: 'Amenities', component: AmenitiesComponent },
          { path: 'Descriptions', component: DescriptionsComponent },
          { path: 'Images', component: ImagesComponent },
          { path: 'Notifications', component: NotificationsComponent },
          { path: 'Barcodes', component: BarcodesComponent }
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
