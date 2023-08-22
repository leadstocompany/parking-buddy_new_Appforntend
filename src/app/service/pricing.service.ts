import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });
  createPricing(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/parking_location/add/pricing/`, data, { headers: this.headers, withCredentials: true })
  }

  updatePricing(data: any): Observable<any> {
    return this._http.put(`${environment.URL}/parking_location/update/pricing/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }

  editPricing(data: { data: FormData, _id: string }): Observable<any> {
    return this._http.post(`${environment.URL}`, data.data, { headers: this.headers, withCredentials: true })
  }

  getPricingById(id: any): Observable<any> {
    return this._http.get(`${environment.URL}/parking_location/pricing/?id=${id}`, { headers: this.headers, withCredentials: true })
  }


}
