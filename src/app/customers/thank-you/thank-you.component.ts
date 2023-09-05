import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedRating: number | undefined;

  constructor(private _route:Router){}

  rate(star: number) {
    this.selectedRating = star;
  }

  public submitForm() {
    this._route.navigate(['/customers'])
  }
}
