import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });
  constructor(private _http: HttpClient) { }
  searchAddress(code: string, filter: string, sort: string): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/get/all_property/?search=${code}&filter=${filter}&sort_by=${sort}`,
    );
  }

  filterProduct(code: string): Observable<any> {
    console.log(code)
    return this._http.get(
      `${environment.URL}/parking_location/get/all_product/?search=${code}`,{ headers: this.headers, withCredentials: true }
    );
  }

  singleAllDetails(id: string): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/property/${id}/list/
      `,
      { headers: this.headers, withCredentials: true }
    );
  }

  bookingPlot(data: any): Observable<any> {
    console.log(data,'booking-----------')
    return this._http.post(`${environment.URL}/normal_user/bookingplot/create/`, data,{ headers: this.headers, withCredentials: true })
  }

  createUser(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/normal_user/user/register/`, data)
  }


  getOpenReservationDetails(): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/openbooking/`, { headers: this.headers, withCredentials: true })
  }

  getPastReservationDetails(): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/pastbooking/`, { headers: this.headers, withCredentials: true })
  }

  getProfileDetails(): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/get/user-profile/`, { headers: this.headers, withCredentials: true })
  }

  changePassword(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/change/password/`, data, { headers: this.headers, withCredentials: true })
  }

  updateProfile(data: any): Observable<any> {
    console.log('data==>', data);
    return this._http.put(`${environment.URL}/normal_user/update/user-profile/`, data, { headers: this.headers, withCredentials: true })
  }

  // payment

}
