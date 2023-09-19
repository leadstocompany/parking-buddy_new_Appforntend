import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/service/notifications.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-edit-notifications',
  templateUrl: './edit-notifications.component.html',
  styleUrls: ['./edit-notifications.component.scss']
})
export class EditNotificationsComponent {
  email: string = '';
  category: string = '';
  spinner = false
  allNotification: any = []
  constructor(
    private _notificationService: NotificationsService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  createNotification() {
    this.spinner = true
    const data = {
      "category": this.category,
      "email": this.email,
      "property": this.data.id
    }
    this._notificationService.createNotificationService(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.getNotification()
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })

  }

  ngOnInit() {
    this.getNotification()
  }

  public getNotification() {
    this._notificationService.getNotification(this.data.id).subscribe({
      next: (res) => {
        console.log(res, 'get Notification')
        this.allNotification = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
