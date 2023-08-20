import { Component } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent {
  isCheckInActive = true;
  isCheckOutActive = false;
  activeTab = 'checkIn';
  showCheckIn() {
    this.isCheckInActive = true;
    this.isCheckOutActive = false;
    this.activeTab = 'checkIn';
  }

  showCheckOut() {
    this.isCheckOutActive = true;
    this.isCheckInActive = false;
    this.activeTab = 'checkOut';
  }

}
