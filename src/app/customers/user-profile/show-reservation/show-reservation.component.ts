import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-show-reservation',
  templateUrl: './show-reservation.component.html',
  styleUrls: ['./show-reservation.component.scss']
})
export class ShowReservationComponent {
  openReservationData!: any

  constructor(
    private _dialogRef: MatDialogRef<ShowReservationComponent>,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) { }

  fetchData(): void {
    this._customerService.changePassword(this.userData.id).subscribe({
      next: (res) => {
        console.log('res ==>', res);
        this._snackbarService.openSnackbar('✔ Password Change Successfully')
        this._dialogRef.close()
      },
      error: (error: any) => {
        console.log(error);
        this._snackbarService.openSnackbar(`❌ ` + error.error[0])
      },
    })
  }

  public close(): void {
    this._dialogRef.close()
  }
}
