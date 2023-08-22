import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CalenderService {
  constructor(private _http: HttpClient) {}

  createBasicDetailsService(): Observable<any> {
    return this._http.post(`${environment.URL}`, {});
  }

  createOperatingHours(): Observable<any> {
    return this._http.post(`${environment.URL}`, {});
  }

  createShuttleHours(): Observable<any> {
    return this._http.post(`${environment.URL}`, {});
  }
}
