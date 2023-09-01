import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { ResultsComponent } from './results/results.component';
import { SingleDetailsComponent } from './results/single-details/single-details.component';
import { PaymentpageComponent } from './paymentpage/paymentpage.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const routes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: CustomersComponent
      },
      {
        path: 'result', children: [
          {
            path: '', component: ResultsComponent
          },
          {
            path: 'details/:id', component: SingleDetailsComponent
          }
        ]
      },
      {
        path: 'payment/:id', component: PaymentpageComponent
      },
      {
        path: 'user-profile', component: UserProfileComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
