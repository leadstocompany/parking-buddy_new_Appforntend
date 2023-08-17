import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  // userLocation = { lat: 22.719568, lng: 75.857727 }; // User's current location
  // zoom = 12;

  // outlets:any = [
  //   { latLng: { east: 22.720553+0.01, north: 75.860472+0.01, south:22.720553-0.01 ,west:75.860472-0.01}, label: 'example-1', icon: 'https://th.bing.com/th/id/OIP.XvviH_VqjOs7C_gyuxaoZAHaHa?w=208&h=208&c=7&r=0&o=5&pid=1.7', name: 'Outlet A', address: 'indore 1' },
  //   { latLng: { east: 22.721740+0.01, north: 75.865368+0.01, south:22.721740-0.01 ,west:75.865368-0.01}, label: 'example-2', icon: 'https://th.bing.com/th/id/OIP.XvviH_VqjOs7C_gyuxaoZAHaHa?w=208&h=208&c=7&r=0&o=5&pid=1.7', name: 'Outlet B', address: 'indore 2' },
  // ];
  // selectedOutlet = {};

  center: google.maps.LatLngLiteral = {lat: 22.719568, lng: 75.857727};
  zoom = 4;

  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  imageBounds: google.maps.LatLngBoundsLiteral = {
    east: 22.719568,
    north: 75.857727,
    south: -22.719568,
    west: -75.857727,
  };

}
