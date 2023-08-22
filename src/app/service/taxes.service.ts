import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  });
  constructor(private _http: HttpClient) { }

  createTaxService(data: any): Observable<any> {
    return this._http.post(`${environment.URL}/parking_location/add/taxesfees/`, data, { headers: this.headers, withCredentials: true })
  }

  getTaxesfeesById(id: any): Observable<any> {
    return this._http.get(`${environment.URL}/parking_location/taxesfees/?id=${id}`, { headers: this.headers, withCredentials: true })
  }

  updateTaxesfess(data: any): Observable<any> {
    return this._http.put(`${environment.URL}/parking_location/update/taxesfees/${data.id}/`, data.data, { headers: this.headers, withCredentials: true })
  }
}
