import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor() { }
  getCurrentLocation(): Promise<GeolocationCoordinates> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  getAddressFromCoordinates(coords: GeolocationCoordinates): Promise<string> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      const latLng = new google.maps.LatLng(
        coords.latitude,
        coords.longitude
      );

      geocoder.geocode({ location: latLng }, (results:any, status:any) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0]);
        } else {
          reject(new Error('Unable to geocode coordinates.'));
        }
      });
    });
  }
}