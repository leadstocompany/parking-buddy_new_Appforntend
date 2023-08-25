import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private _http: HttpClient) { }


  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });

  createBasicDetailsService(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/parking_location/create/property/`, data, { headers: this.headers, withCredentials: true })
  }

  getAllBasicDetailsService(): Observable<any> {
    return this._http.get(`${environment.URL}/parking_location/get/all_property/`, { headers: this.headers, withCredentials: true })
  }

  getSingleBasicDetailsService(id: any): Observable<any> {
    console.log(id,'--->id')
    return this._http.get(`${environment.URL}/parking_location/update/property/${id}/`, { headers: this.headers, withCredentials: true })
  }
  udpateSingleBasicDetailsService(data: any): Observable<any> {
    console.log(data)
    return this._http.put(`${environment.URL}/parking_location/update/property/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }

  getDetailsBasisOfUser(): Observable<any> {
    return this._http.get(`${environment.URL}/parking_location/property/filtered_data/`, { headers: this.headers, withCredentials: true })
  }

  createOperatingHours(data: any): Observable<any> {
    console.log(data)
    return this._http.put(`${environment.URL}/parking_location/add/operating_hour/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }

  // shuttleHours ===========
  // /parking_location/shuttlehours/?id=

  createShuttleHours(data: any): Observable<any> {

    console.log(data,'create hours')
    return this._http.post(`${environment.URL}/parking_location/add/shuttlehours/`,data, { headers: this.headers, withCredentials: true })
  }

  UpdateShuttleHours(data: any): Observable<any> {
    console.log(data,'update data')
    return this._http.put(`${environment.URL}/parking_location/update/shuttlehours/${data.id}/`,data.data, { headers: this.headers, withCredentials: true })
  }


  getShuttleHours(id: any): Observable<any> {
    console.log(id,'--->id')
    return this._http.get(`${environment.URL}/parking_location/shuttlehours/?id=${id}`, { headers: this.headers, withCredentials: true })
  }

  deleteDetailsById(id: string): Observable<any> {
    console.log('id',id)
    return this._http.delete(`${environment.URL}/parking_location/property/${id}/delete`, { headers: this.headers, withCredentials: true })
  }

}
