import { Component } from '@angular/core';
import { NotificationsService } from 'src/app/service/notifications.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  email: string = '';
  category: string = '';
  spinner = false

  constructor(private _notificationService: NotificationsService, private _snackbarService: SnackbarService) { }

  createNotification() {
    this.spinner = true
    const data = {
      "category": this.category,
      "email": this.email,
      "property": localStorage.getItem('detailsId')
    }
    this._notificationService.createNotificationService(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false
      }
    })

  }


}
