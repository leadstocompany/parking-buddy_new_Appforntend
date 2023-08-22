import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private _http: HttpClient) {}

  createBasicDetailsService(data: any): Observable<any> {
    return this._http.post(
      `${environment.URL}/parking_location/create/property/`,
      data
    );
  }

  getAllBasicDetailsService(): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/get/all_property/`
    );
  }

  getDetailsBasisOfUser(): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/property/filtered_data/`
    );
  }

  createOperatingHours(data: any): Observable<any> {
    console.log(data);
    return this._http.put(
      `${environment.URL}/parking_location/add/operating_hour/${data.id}/`,
      data.data
    );
  }

  createShuttleHours(data: FormData): Observable<any> {
    return this._http.post(`${environment.URL}`, data, {
      withCredentials: true,
    });
  }
}
