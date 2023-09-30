import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { WarningComponentComponent } from '../../warning-component/warning-component.component';

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
    private _dialog: MatDialog,
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

  public cancelReservations(): void {
    const dialogRef = this._dialog.open(WarningComponentComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        id: this.profileForm.value.reservation
      }
    });
  }
}
