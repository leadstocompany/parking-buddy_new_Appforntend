import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
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
import { AlldetailsComponent } from './alldetails/alldetails.component';
import { CreateParkingPlotComponent } from './create-parking-plot/create-parking-plot.component';
import { EditTableComponent } from './alldetails/edit-table/edit-table.component';
import { EditDetailsComponent } from './alldetails/edit-table/edit-details/edit-details.component';
import { EditProductsComponent } from './alldetails/edit-table/edit-products/edit-products.component';
import { EditPricingComponent } from './alldetails/edit-table/edit-pricing/edit-pricing.component';
import { EditBlackoutsComponent } from './alldetails/edit-table/edit-blackouts/edit-blackouts.component';
import { EditTaxesAndFessComponent } from './alldetails/edit-table/edit-taxes-and-fess/edit-taxes-and-fess.component';
import { MatListModule } from '@angular/material/list';
import { EditAmenitiesComponent } from './alldetails/edit-table/edit-amenities/edit-amenities.component';
import { EditDescriptionsComponent } from './alldetails/edit-table/edit-descriptions/edit-descriptions.component';
import { EditBarcodesComponent } from './alldetails/edit-table/edit-barcodes/edit-barcodes.component';
import { EditNotificationsComponent } from './alldetails/edit-table/edit-notifications/edit-notifications.component';
import { EditImageComponent } from './alldetails/edit-table/edit-image/edit-image.component';
import { EditProfileComponent } from './sidebar/edit-profile/edit-profile.component';
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
    AlldetailsComponent,
    CreateParkingPlotComponent,
    EditTableComponent,
    EditDetailsComponent,
    EditProductsComponent,
    EditPricingComponent,
    EditBlackoutsComponent,
    EditTaxesAndFessComponent,
    EditAmenitiesComponent,
    EditDescriptionsComponent,
    EditBarcodesComponent,
    EditNotificationsComponent,
    EditImageComponent,
    EditProfileComponent
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
    HttpClientModule,
    MatListModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParkingModule { }
