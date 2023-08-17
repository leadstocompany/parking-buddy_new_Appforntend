import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AmentitiesService {

  constructor(private _http: HttpClient) { }

  createAmenities(data:any): Observable<any> {
    console.log(data)
    return this._http.post(`http://139.84.137.166/parking_location/add/amenities/`,data)
  }

}
