import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http: HttpClient) { }
  registerUser(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/users/register/`, data)
  }
  loginUser(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/users/login/`, data,)
  }
}
