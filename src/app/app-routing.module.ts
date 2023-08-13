import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'

const routes: Routes = [
  { path: '', redirectTo: "parking/Details/General", pathMatch: 'full' },
  { path: 'parking', loadChildren: () => import('./parking/parking.module').then(m => m.ParkingModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
