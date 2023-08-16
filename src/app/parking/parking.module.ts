import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingComponent } from './parking.component';
import { DetailsComponent } from './details/details.component';
import { ProductsComponent } from './products/products.component';
import { PricingComponent } from './pricing/pricing.component';
import { BlackoutsComponent } from './blackouts/blackouts.component';
import { TaxesComponent } from './taxes/taxes.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';
import { ImagesComponent } from './images/images.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BarcodesComponent } from './barcodes/barcodes.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MaterialModule } from '../material/material.module';
import { GeneralComponent } from './details/general/general.component';
import { OperatingHoursComponent } from './details/operating-hours/operating-hours.component';
import { ShuttleHoursComponent } from './details/shuttle-hours/shuttle-hours.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AllBlackoutsComponent } from './blackouts/all-blackouts/all-blackouts.component';
import { SettingComponent } from './blackouts/setting/setting.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { CalenderComponent } from './calender/calender.component'; 
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    SidebarComponent,
    ParkingComponent,
    DetailsComponent,
    ProductsComponent,
    PricingComponent,
    BlackoutsComponent,
    TaxesComponent,
    AmenitiesComponent,
    DescriptionsComponent,
    ImagesComponent,
    NotificationsComponent,
    BarcodesComponent,
    GeneralComponent,
    OperatingHoursComponent,
    ShuttleHoursComponent,
    AllBlackoutsComponent,
    SettingComponent,
    CalenderComponent,
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgxMaterialTimepickerModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParkingModule { }
