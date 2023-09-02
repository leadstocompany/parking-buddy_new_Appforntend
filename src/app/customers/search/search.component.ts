import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';

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

  constructor(private _router: Router, private _customerService: CustomerService) {
  }

  public ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((searchTerm: any) => this._customerService.searchAddress(searchTerm)) // Custom function for making API call
      )
      .subscribe((data) => {
        this.searchData = data;
        console.log(data)
      });
  }

  public ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  public changeRout(rout: string): void {
    if (rout === 'profile') {
      this._router.navigate(["/customers/user-profile"])
    } else if (rout === 'sign-In') {
      this._router.navigate(['/'])
    } else {
      this._router.navigate(['/signUP'])
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
    if (this.checkIn && this.checkout && this.searchData.length) {
      const queryParams = {
        data: JSON.stringify(this.searchData),
        checkIn: this.checkIn,
        checkout: this.checkout
      };
      this._router.navigate(['/customers/result'], { queryParams })
    } else {
      alert('check in and check out required')
    }

  }
}
