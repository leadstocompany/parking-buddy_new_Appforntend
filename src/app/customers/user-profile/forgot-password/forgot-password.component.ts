import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  selected = new FormControl(0);
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public userData: any
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      nPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  public close(): void {
    this._dialogRef.close()
  }

  public changePassword(): void {
    if (this.profileForm.controls['nPassword'].value !== this.profileForm.controls['confirmPassword'].value) {
      this._snackbarService.openSnackbar(`❌new password and confirm password not matched`)
      return
    } else {
      const data = {
        username: this.userData.userName,
        old_password: this.profileForm.controls['currentPassword'].value,
        new_password: this.profileForm.controls['nPassword'].value
      }
      this._customerService.changePassword(data).subscribe({
        next: (res) => {
          console.log('res ==>', res);
          this._snackbarService.openSnackbar('✔ Password Change Successfully')
          this._dialogRef.close()
        },
        error: (error:any) => {
          console.log(error);
          this._snackbarService.openSnackbar(`❌ `+error.error[0])
        },
      })
    }
  }
}
