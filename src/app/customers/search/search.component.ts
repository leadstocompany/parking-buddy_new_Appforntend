import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { LocationService } from 'src/app/service/location.service';
import { CancellationComponent } from './cancellation/cancellation.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  private searchTerms = new Subject<string>();
  searchData: any[] = [];
  private searchSubscription?: Subscription;
  public searchTerm: string = ''
  public checkIn: Date = new Date();
  public checkout: Date = new Date();
  public minCheckInDate: Date = new Date();
  public minCheckOutDate: Date = new Date();
  // initialize variable user login or not 
  public userLogin = false
  public spinner = false
  currentGeo!: GeolocationCoordinates;
  currentAddress!: any;



  @ViewChild('placesSearchInput') placesSearchInput!: ElementRef;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private _router: Router,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    private _dialog: MatDialog,
    ) {
  }


  public handleAddressChange(address: any) {
    // Do some stuff
  }
  public ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   const userFlag = params['user'];
    //   if (userFlag === 'true') {
    //     this.userLogin = true
    //   }
    // });
    this.getUserDetails()
    this.searchTerms
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchTerm: any) => this._customerService.searchAddress(searchTerm, '', '')) // Custom function for making API call
      )
      .subscribe((data) => {
        this.searchData = data;
        this.getUserDetails()
      });


  }

  public ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  public checkOutDate(): void {
    const date = new Date(this.checkIn);
    this.minCheckOutDate = date;
    this.checkout = date;
  }

  public changeRout(rout: string): void {
    if (rout === 'profile') {
      this._router.navigate(["/customers/user-profile"])
    } else if (rout === 'sign-In') {
      this._router.navigate(['/customers/sign-in'])
    } else if (rout == 'sign-up') {
      this._router.navigate(['/customers/sign-up'])
    } else if (rout == 'logOut') {
      //console.log('logout')
      localStorage.removeItem('accessToken')
      this.userLogin = false
      this._router.navigate(['/'])
    }
  }//

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

  public submitForm(): void {
    this.getSearchResult()
  }


  onInputChange() {
    // You can add custom logic for handling input changes here
  }

  /**
   * @description get user details using token 
   */
  getUserDetails(): void {
    this._customerService.getProfileDetails().subscribe({
      next: (res) => {
        //console.log(res)
        if (res.role == "normal_user") {
          this.userLogin = true
        } else {
          localStorage.removeItem('accessToken')
          this.userLogin = false
        }
      },
      error: (error) => {
        //console.log(error.error)
      }
    })
  }

  getSearchResult(): void {
    //console.log(this.searchTerm)
    this.spinner = true
    this._customerService.searchAddress(this.searchTerm, '', '').subscribe({
      next: (data) => {
        this.searchData = data;
        this.getUserDetails()
        if (this.checkIn && this.checkout && this.searchData.length) {
          const queryParams = {
            // data: JSON.stringify(this.searchData),
            data: this.searchTerm,
            checkIn: this.checkIn,
            checkout: this.checkout
          };
          this._router.navigate(['/customers/result'], { queryParams })
        } else {
          this.spinner = false
          this._snackbarService.openSnackbar('❌ Result Not Found')
        }
      },
      error: (error) => {
        //console.log(error.error)
        this.spinner = false
        this._snackbarService.openSnackbar('❌' + error.error)
      }
    })
  }


  currentAddressLocation(): void {
    this.locationService.getCurrentLocation().then((coords) => {
      this.currentGeo = coords;
      this.locationService
        .getAddressFromCoordinates(coords)
        .then((address: any) => {
          //console.log(address?.address_components)
          this.currentAddress = address?.address_components.filter((type: any) => type.types[0] == "postal_code")
          this.searchTerm = this.currentAddress[0]?.long_name
          this.getSearchResult()
          if (!this.searchData.length) {
            this.currentAddress = address?.address_components.filter((type: any) => type.types[0] == "locality")
            this.searchTerm = this.currentAddress[0]?.long_name
            this.getSearchResult()
          }

        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  cancelModal(): void {
    this._dialog.open(CancellationComponent, {
      autoFocus: false,
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }
}
