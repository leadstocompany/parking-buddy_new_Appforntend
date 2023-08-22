import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AmentitiesService {
  //
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });
  constructor(private _http: HttpClient) { }

  createAmenities(data: any): Observable<any> {
    console.log(data);
    return this._http.post(
      `${environment.URL}/parking_location/add/amenities/`,
      data,
      { headers: this.headers, withCredentials: true });
  }

  getAmenitiesById(id: string): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/amenities/?id=${id}`,
      { headers: this.headers, withCredentials: true }
    );
  }

  updateAmenities(data: any): Observable<any> {
    return this._http.put(
      `${environment.URL}/parking_location/update/amenities/${data.id}/`,
      data.data,
      { headers: this.headers, withCredentials: true }
    );
  }
}
