import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) { }
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });
  registerUser(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/register/`, data, { withCredentials: true })
  }

  loginUser(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/users/login/`, data, { withCredentials: true })
  }

  emailVerifySendOtp(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/email-verify-send-otp/`, data, { withCredentials: true })
  }
  emailVerifyOtp(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/verify-otp/`, data, { withCredentials: true })
  }

  // send otp for gest
  guestEmailVerifySendOtp(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/guest-verify-send-otp/`, data, { withCredentials: true })
  }
  guestEmailVerifyOtp(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/guest-verify-otp/`, data, { withCredentials: true })
  }



  getUser(): Observable<any> {
    return this._http.get(`${environment.URL}/users/get/userprofile/`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true })
  }

  UpdateUser(data: any): Observable<any> {
    return this._http.put(`${environment.URL}/users/update/user-profile/`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }, withCredentials: true })
  }

  sentOptOnEmail(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/send-otp/`, data, { withCredentials: true })
  }
  verifyOptOnEmail(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/reset-password/`, data, { withCredentials: true })
  }
  resetPassword(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/users/register/`, data, { withCredentials: true })
  }
}
