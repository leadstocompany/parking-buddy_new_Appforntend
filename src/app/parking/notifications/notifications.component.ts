import { Component } from '@angular/core';
import { NotificationsService } from 'src/app/service/notifications.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
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
  allNotification: any = []
  editData: any;
  constructor(private _notificationService: NotificationsService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }

  createNotification() {
    this.spinner = true
    const data = {
      "category": this.category,
      "email": this.email,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }
    this._notificationService.createNotificationService(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        if (this.editData.edit) {
          this.getNotification(this.editData.id)
        } else {
          this.getNotification(this._saveService.getPropertyId())
        }

      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })

  }


  ngOnInit() {
    // Check edit or not 
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getNotification(this.editData.id)

    } else if (this.editData.edit === false) {
      this.getNotification(this._saveService.getPropertyId())

    }
  }

  public getNotification(id: any) {
    this._notificationService.getNotification(id).subscribe({
      next: (res) => {
        this.allNotification = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public deleteNotification(id: any) {
    this._notificationService.deleteNotificationById(id).subscribe({
      next: (res) => {
        this._snackbarService.openSnackbar('✔  Successfully Delted')
        if (this.editData.edit) {
          this.getNotification(this.editData.id)
        } else {
          this.getNotification(this._saveService.getPropertyId())
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}
