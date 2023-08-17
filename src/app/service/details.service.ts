import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private _http: HttpClient) { }


  createBasicDetailsService(data: any): Observable<any> {
    return this._http.post(`http://139.84.137.166/parking_location/create/property/`, data)
  }

  getAllBasicDetailsService(): Observable<any> {
    return this._http.get('http://139.84.137.166/parking_location/get/all_property/')
  }


  createOperatingHours(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`http://139.84.137.166/parking_location/add/operating_hour/${data.id}/`, data.data)
  }

  createShuttleHours(data: FormData): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, data, { withCredentials: true })
  }

}
