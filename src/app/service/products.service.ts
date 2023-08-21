import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) { }
  createProduct(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/add/product/`, data,{ withCredentials: true })
  }

  updateProduct(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/update/product/<id_product>/`, data,{ withCredentials: true })
  }

  getProductById(id: string): Observable<any> {
    console.log(id, 'id')
    return this._http.get(`${environment.URL}/parking_location/product/?id=${id}`,{ withCredentials: true })
  }
}
