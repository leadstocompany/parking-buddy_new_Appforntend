import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
const routes: Routes = [
  // { path: '', redirectTo: "parking/Details/General", pathMatch: 'full' },
  
  { path: '', component: SignInPageComponent },
  { path: 'signUP', component: SignUpPageComponent },
  { path: 'parking', loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
