import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: '', component: CustomersComponent
      },
      {
        path: 'result', component: ResultsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
