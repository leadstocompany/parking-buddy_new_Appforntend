import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {
  constructor(private _http: HttpClient) { }
  createTaxService(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/add/taxesfees/`, data, { withCredentials: true })
  }

  getTaxesfeesById(id: string): Observable<any> {
    return this._http.get(`${environment.URL}/parking_location/taxesfees/?id=${id}`, { withCredentials: true })
  }
}
