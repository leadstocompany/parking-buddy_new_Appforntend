import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BarcodesService {

  constructor(private _http: HttpClient) { }

  createBarCodes(data:any): Observable<any> {
    return this._http.post(`${environment.URL}/parking_location/add/barcode/`,data)
  }

  createBlackouts(data: any): Observable<any> {
    console.log(data)
    return this._http.post(`${environment.URL}/parking_location/add/blackout/`, data)
  }

  getBlackoutsById(id:string):Observable<any>{
    return this._http.get(`${environment.URL}/parking_location/blackout/?id=${id}`)
  }

}
