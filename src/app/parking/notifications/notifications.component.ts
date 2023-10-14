import { Component, ViewChild, ElementRef } from '@angular/core';
import { DescriptionsService } from 'src/app/service/descriptions.service';
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
  message: any
  @ViewChild('staticBackdrop') modalElement!: ElementRef;
  constructor(private _descriptionService: DescriptionsService, private _notificationService: NotificationsService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }

  createNotification() {
    this.spinner = true
    const data = {
      "category": this.category,
      "email": this.email,
      "message":this.message,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }
    this._notificationService.createNotificationService(data).subscribe({
      next: (res) => {
        //console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        if (this.editData.edit) {
          this.getNotification(this.editData.id)
        } else {
          this.getNotification(this._saveService.getPropertyId())
        }
        this.modalElement.nativeElement.click();
      },
      error: (error) => {
        //console.log(error)
        this._snackbarService.openSnackbar('❌ ' + error.error[0])
        this.spinner = false
      }
    })

  }


  getDescription(id: any) {
    this._descriptionService.getDescriptionsById(id).subscribe({
      next: (res) => {
        if (res.length) {
          this.message = res[res.length - 1]
        }
      },
      error: (error) => {
        //console.log(error)
      }
    })
  }


  ngOnInit() {
    // Check edit or not 
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getNotification(this.editData.id)
      this.getDescription(this.editData.id)

    } else if (this.editData.edit === false) {
      this.getNotification(this._saveService.getPropertyId())
      this.getDescription(this._saveService.getPropertyId())

    }
  }

  public getNotification(id: any) {
    this._notificationService.getNotification(id).subscribe({
      next: (res) => {
        this.allNotification = res
      },
      error: (error) => {
        //console.log(error)
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
        //console.log(error)
      }
    })
  }


}
