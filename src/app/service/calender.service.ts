import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });

  constructor(private _http: HttpClient) { }

  createBasicDetailsService(): Observable<any> {
    return this._http.post(`${environment.URL}`, {headers: this.headers, withCredentials: true })
  }

  createOperatingHours(): Observable<any> {
    return this._http.post(`${environment.URL}`, {headers: this.headers, withCredentials: true })
  }

  createShuttleHours(): Observable<any> {
    return this._http.post(`${environment.URL}`, {headers: this.headers, withCredentials: true })
  }
}
