import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BarcodesService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });

  constructor(private _http: HttpClient) { }

  createBarCodes(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/parking_location/add/barcode/`, data, { headers: this.headers, withCredentials: true })
  }

  getBarCodesById(id: string): Observable<any> {
    return this._http.get(`${environment.URL}/parking_location/barcode/?id=${id}`, { headers: this.headers, withCredentials: true })
  }

  updateBarCodes(data: any) {
    console.log(data,'data')
    return this._http.put(`${environment.URL}/parking_location/update/barcode/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }

  createBlackouts(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/add/blackout/`, data, { headers: this.headers, withCredentials: true })
  }

  getBlackoutsById(id: string): Observable<any> {
    console.log('id',id)
    return this._http.get(`${environment.URL}/parking_location/blackout/?id=${id}`, { headers: this.headers, withCredentials: true })
  }

  updateBlackouts(data: any) {
    return this._http.put(`${environment.URL}/parking_location/update/blackout/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }

}
