import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PricingService {

  constructor(private _http: HttpClient) { }

  createPricing(data:FormData): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, { withCredentials: true })
  }

  editPricing(data: { data: FormData, _id: string }): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, data.data, { withCredentials: true })
  }


}
