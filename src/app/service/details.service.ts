import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private _http: HttpClient) { }

  createBasicDetailsService(data: FormData): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, data, { withCredentials: true })
  }

  createOperatingHours(data: FormData): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, data, { withCredentials: true })
  }

  createShuttleHours(data: FormData): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, data, { withCredentials: true })
  }

}
