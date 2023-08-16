import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

  createProduct(data: { type: string }): Observable<any> {
    return this._http.post(`${environment.baseUrl}`, data, { withCredentials: true })
  }
}
