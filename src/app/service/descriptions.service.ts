import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DescriptionsService {
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });

  constructor(private _http: HttpClient) { }
  createDescriptions(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/parking_location/add/description/`, data, { headers: this.headers, withCredentials: true })
  }

  getDescriptionsById(id: string): Observable<any> {
    return this._http.get(`${environment.URL}/parking_location/description/?id=${id}`, { headers: this.headers, withCredentials: true })
  }

  updateDescriptionsById(data: any): Observable<any> {
    return this._http.put(`${environment.URL}/parking_location/update/description/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }



}
