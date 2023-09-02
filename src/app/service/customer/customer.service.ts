import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });
  constructor(private _http: HttpClient) { }
  searchAddress(code: string): Observable<any> {
    console.log(code)
    return this._http.get(
      `${environment.URL}/parking_location/get/all_property/?search=${code}`,
    );
  }
}
