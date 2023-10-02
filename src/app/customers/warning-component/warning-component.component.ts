import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-warning-component',
  templateUrl: './warning-component.component.html',
  styleUrls: ['./warning-component.component.scss']
})

export class WarningComponentComponent {
  constructor(
    private dialogRef: MatDialogRef<WarningComponentComponent>,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) { }

  close() {
    this.dialogRef.close();
  }

  confirmCancellation() {
    this._customerService.cancelReservation(this.userData.id).subscribe({
      next: (res) => {
        if (res.error) {
          this._snackbarService.openSnackbar(`❌ ` + res.error)
        } else {
          this._snackbarService.openSnackbar(`❌ ` + res.message)
          this.close()
        }
      },
      error: (error: any) => {
        //console.log(error);
        this._snackbarService.openSnackbar(`❌ ` + error.error[0])
      },
    })
  }
}
