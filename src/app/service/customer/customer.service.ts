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
      `${environment.URL}/parking_location/get/all_product/?search=${code}`,
    );
  }

  singleAllDetails(id: string): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/property/${id}/list/
      `,
    );
  }

  bookingPlot(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/normal_user/bookingplot/create/`,data)
  }

  createUser(data:any):Observable<any>{
    return this._http.post(`${environment.URL}/normal_user/user/register/`,data)
  }


}
