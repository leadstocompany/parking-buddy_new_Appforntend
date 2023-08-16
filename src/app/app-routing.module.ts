import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
const routes: Routes = [
  // { path: '', redirectTo: "parking/Details/General", pathMatch: 'full' },
  { path: '', component: SignUpPageComponent },
  { path: 'login', component: SignInPageComponent },
  { path: 'parking', loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
