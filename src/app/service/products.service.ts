import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) { }
  createProduct(data:any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/add/product/`, data)
  }
}
