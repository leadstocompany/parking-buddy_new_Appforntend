import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  private currentApiStatus: BehaviorSubject<Boolean>;
  obsCurrentApiStatus: Observable<Boolean>;

  constructor(httpClient: HttpClient) {
    this.currentApiStatus =  new BehaviorSubject(new Boolean(false));
    this.obsCurrentApiStatus = this.currentApiStatus.asObservable();

    httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.MAP_URL}`, 'callback')
    .pipe(
      map(() => true),
      catchError((error) => of(error)),
    ).subscribe( loaded => {
      this.currentApiStatus.next(loaded);
    });
  }
}