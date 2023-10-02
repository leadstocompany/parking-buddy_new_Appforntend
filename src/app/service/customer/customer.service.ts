import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // headers = new HttpHeaders({
  //   'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  // });
  headers = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  constructor(private _http: HttpClient) { }
  searchAddress(code: string, filter: string, sort: string): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/get/all_property/?search=${code}&filter=${filter}&sort_by=${sort}`,
    );
  }

  filterProduct(code: string): Observable<any> {
    //console.log(code)
    return this._http.get(
      `${environment.URL}/parking_location/get/all_product/?search=${code}`, { withCredentials: true }
    );
  }

  singleAllDetails(id: string): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/property/${id}/list/
      `,
      { withCredentials: true }
    );
  }

  bookingPlot(data: any): Observable<any> {
    //console.log(data, 'booking-----------')
    return this._http.post(`${environment.URL}/normal_user/bookingplot/create/`, data, { withCredentials: true })
  }

  createUser(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/normal_user/user/register/`, data, { withCredentials: true })
  }


  getOpenReservationDetails(): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/openbooking/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true })
  }

  getPastReservationDetails(): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/pastbooking/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true })
  }

  getProfileDetails(): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/get/user-profile/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true })
  }

  changePassword(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/change/password/`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true })
  }

  updateProfile(data: any): Observable<any> {
    //console.log('data==>', data);
    return this._http.put(`${environment.URL}/normal_user/update/user-profile/`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true })
  }

  // payment
  getBookingSlot(id: string): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/bookingslot/${id}/list/`, { withCredentials: true })
  }
  
  // cancel reservation 
  cancelReservation(id: any): Observable<any> {
    return this._http.post(`${environment.URL}/normal_user/booking/cancel/${id}/`,{status : 'canceled'},{ withCredentials: true })
  }
  // show reservation 
  showReservation(id: any): Observable<any> {
    return this._http.get(`${environment.URL}/normal_user/bookingslot/${id}/list/`, { withCredentials: true })
  }
}
