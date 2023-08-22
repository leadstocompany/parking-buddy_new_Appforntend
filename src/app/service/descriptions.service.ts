import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DescriptionsService {
  constructor(private _http: HttpClient) {}
  createDescriptions(data: any): Observable<any> {
    return this._http.post(
      `${environment.URL}/parking_location/add/description/`,
      data
    );
  }

  getDescriptionsById(id: string): Observable<any> {
    return this._http.get(
      `${environment.URL}/parking_location/description/?id=${id}`
    );
  }
}
