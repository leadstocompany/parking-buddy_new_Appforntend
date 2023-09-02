import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import currency from '../../parking/ACurrency.json'
import { CustomerService } from 'src/app/service/customer/customer.service';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  constructor(private router: Router, private _route: ActivatedRoute,private _customerService: CustomerService) { }
  public results: Array<any> = [];
  public date!: { checkIn: Date, checkOut: Date }
  amountIcon = '₹'
  currency: any = currency?.currency
  public searchTerm: string = ''
  private searchTerms = new Subject<string>();
  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((searchTerm: any) => this._customerService.searchAddress(searchTerm)) // Custom function for making API call
      )
      .subscribe((data) => {
        this.results  = data;
        console.log(data)
      });

    this._route.queryParams.subscribe((queryParams) => {
      this.results = JSON.parse(queryParams['data']);
      this.date = {
        checkIn: queryParams['checkIn'],
        checkOut: queryParams['checkout']
      }
    });
    console.log(this.results[0], '----------->')
    console.log(this.date, '------------>')
    console.log(this.results[0].property_logo[0].logo, 'logo-------------')
  }

  public search(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    if (this.searchTerm.length > 1) {
      this.searchInput();
    }
  }

  public searchInput(): void {
    this.searchTerms.next(this.searchTerm);
  }

  redirectToDetails() {
    const id = 123; // Replace with the actual ID
    this.router.navigate(['/customers/result/details', id]);
  }


  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  display!: google.maps.LatLngLiteral;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }
}
