import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler, ViewChild } from '@angular/core';
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
  constructor(private router: Router, private _route: ActivatedRoute, private _customerService: CustomerService) { }
  public results: Array<any> = [];
  public date!: { checkIn: Date, checkOut: Date }
  amountIcon = '₹'
  currency: any = currency?.currency
  public searchTerm: string = ''
  private searchTerms = new Subject<string>();
  spinner = false
  filterData: Array<{ id: string, type: string }> = [];
  selecteType: string = ''
  sortType:string=''
  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((searchTerm: any) => this._customerService.searchAddress(searchTerm, '', '')) // Custom function for making API call
      )
      .subscribe({
        next: (data) => {
          this.spinner = false
          this.results = data;
          console.log(data)
        },
        error: (error) => {
          this.spinner = false
          console.log('error', error)
        }
      }
      );

    this._route.queryParams.subscribe((queryParams) => {
      // this.results = JSON.parse(queryParams['data']);
      this.searchTerm = queryParams['data']
      this.date = {
        checkIn: queryParams['checkIn'],
        checkOut: queryParams['checkout']
      }
      this.searchInput();
    });
    console.log(this.results[0])
  }

  public search(event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    if (this.searchTerm.length > 1) {
      this.searchInput();
    }
  }

  public searchInput(): void {
    console.log(this.searchTerm)
    this.spinner = true
    this.searchTerms.next(this.searchTerm);
    this.FilterProduct(this.searchTerm)
  }

  public FilterProduct(value: string): void {
    this._customerService.filterProduct(value).subscribe({
      next: (data) => {
        console.log(data)
        this.filterData = data
      },
      error: (error: ErrorHandler) => {
        console.log(error)
      }
    })
  }

  public filterType() {
    console.log(this.selecteType, 'selecteType')
    this.spinner = true
    this.getDetails(this.searchTerm,this.selecteType.replace(/ /g, "%20").replace(/&/g, "%26"),this.sortType.replace(/ /g, "%20").replace(/&/g, "%26"))
  }


  getDetails(search:string,filter:string,type:string){
    this._customerService.searchAddress(search, filter, type).subscribe({
      next: (data) => {
        this.spinner = false
        this.results = data;
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
