import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss']
})
export class CancellationComponent {
  profileForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<CancellationComponent>,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      reservation: ['', [Validators.required]],
    });
  }

  public close(): void {
    this._dialogRef.close()
  }

  public changePassword(): void {
    const data = {
      reservation: this.profileForm.value.reservation,
    }
    this._customerService.changePassword(data).subscribe({
      next: (res) => {
        console.log('res ==>', res);
        this._snackbarService.openSnackbar('✔ Parking Successfully Canceled')
        this._dialogRef.close()
      },
      error: (error: any) => {
        console.log(error);
        this._snackbarService.openSnackbar(`❌ ` + error.error[0])
      },
    })
  }
}
