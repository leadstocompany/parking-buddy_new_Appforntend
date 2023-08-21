import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private _http: HttpClient) { }

  createImages(data:any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/add/images/`,data,{ withCredentials: true })
  }

  createOperatingHours(): Observable<any> {
    return this._http.post(`${environment.URL}`, { withCredentials: true })
  }

  createShuttleHours(): Observable<any> {
    return this._http.post(`${environment.URL}`, { withCredentials: true })
  }
}
