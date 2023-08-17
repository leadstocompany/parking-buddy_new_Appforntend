import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DescriptionsService {

  constructor(private _http: HttpClient) { }
  createDescriptions(data:any): Observable<any> {
    
    return this._http.post(`http://139.84.137.166/parking_location/add/description/`,data)
  }

}
