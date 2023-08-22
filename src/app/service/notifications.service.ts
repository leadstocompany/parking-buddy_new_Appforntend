import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });
  createNotificationService(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/parking_location/add/notification/`, data,{headers: this.headers, withCredentials: true })
  }

  getNotification(id: any): Observable<any> {
    console.log(id, 'id')
    return this._http.get(`${environment.URL}/parking_location/notification/?id=${id}`,{headers: this.headers, withCredentials: true })
  }
}
