import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [
    CustomersComponent,
    ResultsComponent,
    SearchComponent
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

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomersModule { }
