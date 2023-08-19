import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  constructor(private _http: HttpClient) { }
  createPricing(data: any): Observable<any> {
    console.log(data)
    return this._http.post('http://139.84.137.166/parking_location/add/pricing/', data)
  }

  editPricing(data: { data: FormData, _id: string }): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, data.data, { withCredentials: true })
  }


}
