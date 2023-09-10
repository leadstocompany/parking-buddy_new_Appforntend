import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatListModule } from '@angular/material/list';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// all modules and components
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { MaterialModule } from '../material/material.module';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SingleDetailsComponent } from './results/single-details/single-details.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ForgotPasswordComponent } from './user-profile/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    CustomersComponent,
    ResultsComponent,
    SearchComponent,
    SingleDetailsComponent,
    PaymentpageComponent,
    UserProfileComponent,
    ThankYouComponent,
    CreateUserComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgxMaterialTimepickerModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    MatListModule,
    GoogleMapsModule,
    // GooglePlaceModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomersModule { }
