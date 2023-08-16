import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BarcodesService {

  constructor(private _http: HttpClient) { }

  createBasicDetailsService(): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, { withCredentials: true })
  }

  createBlackouts(data:FormData): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, { withCredentials: true })
  }

}
