import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });

  createImages(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/add/images/`, data, { headers: this.headers, withCredentials: true })
  }

  updateImages(data: any): Observable<any> {
    console.log(data)
    return this._http.put(`${environment.URL}/parking_location/update/images/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }


  getIMages(id: any): Observable<any> {
    console.log(id, '--->id')
    return this._http.get(`${environment.URL}/parking_location/images/?id=${id}`, { headers: this.headers, withCredentials: true })
  }

  getAllIMages(id: any): Observable<any> {
    console.log(id, '--->id')
    return this._http.get(`${environment.URL}/parking_location/imagesbylogo/?id=${id}`, { headers: this.headers, withCredentials: true })
  }

}
