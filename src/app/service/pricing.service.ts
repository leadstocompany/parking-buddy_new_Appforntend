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
    return this._http.post(`${environment.URL}/parking_location/add/pricing/`, data)
  }

  editPricing(data: { data: FormData, _id: string }): Observable<any> {
    return this._http.post(`${environment.URL}`, data.data, { withCredentials: true })
  }

  getPricingById(id:string):Observable<any>{
    return this._http.get(`${environment.URL}/parking_location/pricing/?id=${id}`)
  }


}
