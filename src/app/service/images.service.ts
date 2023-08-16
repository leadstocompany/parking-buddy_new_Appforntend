import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private _http: HttpClient) { }

  createBasicDetailsService(): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, { withCredentials: true })
  }

  createOperatingHours(): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, { withCredentials: true })
  }

  createShuttleHours(): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, { withCredentials: true })
  }
}
