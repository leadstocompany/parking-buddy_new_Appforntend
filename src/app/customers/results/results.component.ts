import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, catchError } from 'rxjs/operators';
import currency from '../../parking/ACurrency.json'
import { CustomerService } from 'src/app/service/customer/customer.service';
import { MapDirectionsService, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  apiLoaded!: Observable<boolean>;
  iconSize: any
  constructor(httpClient: HttpClient, private _snackbarService: SnackbarService, private router: Router, private _route: ActivatedRoute, private _customerService: CustomerService, private mapDirectionsService: MapDirectionsService) {
    try {
      this.apiLoaded = httpClient.jsonp(`https://maps.googleapis.com/maps/api/js?key=${environment.MAP_URL}&libraries=visualization`, 'callback')
        .pipe(
          map(() => {
            this.iconSize = new google.maps.Size(40, 40)
            return true
          }),
          catchError(() => of(false)),
        );
    } catch (error) {
      console.log(error)
    }
  }
  public results: Array<any> = [];
  public date!: { checkIn: Date, checkOut: Date }
  amountIcon = '₹'
  currency: any = currency?.currency
  public searchTerm: string = ''
  private searchTerms = new Subject<string>();
  spinner = false
  filterData: Array<{ id: string, type: string }> = [];
  selecteType: string = ''
  sortType: string = ''

  ngOnInit(): void {
    this._route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['data']
      this.date = {
        checkIn: queryParams['checkIn'],
        checkOut: queryParams['checkout']
      }
      this.searchInput();
    });
  }

  public search(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    if (this.searchTerm.length > 1) {
      this.searchInput();
    }
  }

  public searchInput(): void {
    this.spinner = true
    this.getSearchResult()
    this.FilterProduct(this.searchTerm)
  }

  public FilterProduct(value: string): void {
    this._customerService.filterProduct(value).subscribe({
      next: (data) => {
        this.filterData = data
      },
      error: (error: ErrorHandler) => {
        console.log(error)
      }
    })
  }

  public filterType() {
    this.spinner = true
    this.getDetails(this.searchTerm, this.selecteType.replace(/ /g, "%20").replace(/&/g, "%26"), this.sortType.replace(/ /g, "%20").replace(/&/g, "%26"))
  }


  getDetails(search: string, filter: string, type: string) {
    //console.log(search, filter, this.sortType)
    this._customerService.searchAddress(search, filter, type).subscribe({
      next: (data) => {
        this.spinner = false
        this.results = data;
        //console.log(this.results, '===================>')
        this.addMarker()
      },
      error: (error) => {
        this.spinner = false
        console.log('error', error)
      }
    }
    );
  }

  redirectToDetails(id: string) {
    const queryParams = {
      checkIn: this.date.checkIn,
      checkout: this.date.checkOut
    };
    this.router.navigate(['/customers/result/details', id], { queryParams });
  }


  getSearchResult(): void {
    this.spinner = true
    this.spinner = true
    this._customerService.searchAddress(this.searchTerm, '', '').subscribe({
      next: (data) => {
        this.spinner = false
        this.results = data;
        this.FilterProduct(this.searchTerm)
        this.center = { lat: +this.results[0].latitude, lng: +this.results[0].longitude }
        this.zoom = 10;
        this.addMarker()
      },
      error: (error) => {
        //console.log(error.error)
        this.spinner = false
        this._snackbarService.openSnackbar('❌' + error.error)
      }
    })
  }



  //  map code ============>

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;
  display!: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral = { lat: Number(this.results[0]?.latitude), lng: Number(this.results[0]?.longitude) };
  zoom = 15;

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  onMarkerClick(marker: any) {
    //console.log(`Clicked on: ${marker.title}`);
  }
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

  markerPositions: google.maps.LatLngLiteral[] | any = [];
  addMarker() {
    //console.log(this.results, 'maps')
    this.markerPositions = []
    this.results.map((marker: any) => {
      this.markerPositions.push({ lat: +marker.latitude, lng: +marker.longitude });
    })
  }

  addPath(index: any) {
    const request: google.maps.DirectionsRequest = {
      destination: { lat: +this.results[0].latitude, lng: +this.results[0].longitude },
      origin: { lat: +this.results[1].latitude, lng: +this.results[1].longitude },
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));

  }
  dynamicTittle: any;
  dynamicPrice: any;
  street: any;
  dynamicId: any;
  openInfoWindow(marker: MapMarker, index: any) {
    //console.log(marker)
    //console.log(this.results[index])
    this.dynamicTittle = this.results[index].tittle ? this.results[index].tittle : 'demo',
      this.dynamicPrice = this.currency[this.results[index].country] + " " + this.results[index].property_pricing[0].dail_rate
    this.street = this.results[index].street
    this.dynamicId = this.results[index].id
    this.infoWindow.open(marker);
  }


}
