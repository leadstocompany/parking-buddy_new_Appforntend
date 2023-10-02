import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  emailotp!: FormControl
  emailAddress: any = '';
  spinner: boolean = false;
  constructor(
    private _dialogRef: MatDialogRef<VerifyOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private _authService: AuthService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit() {
    this.emailAddress = this.userData?.email
    this.emailotp = new FormControl('', [Validators.required]);
  }

  public close(bool: boolean): void {
    this._dialogRef.close({ verify: bool })
  }

  verifyEmailOtp(): void {
    if (this.userData.customerUser) {
      this.verifyCustomUserOpt()
    } else {
      this.verifyUserOpt()
    }

  }
  verifyUserOpt(): void {
    if (this.userData?.email != '' && this.emailotp?.value.length == 6) {
      this.spinner = true
      this._authService.emailVerifyOtp({ email: this.userData?.email, otp: this.emailotp?.value }).subscribe({
        next: (res) => {
          this._snackBarService.openSnackbar('✔ Successfully OTP verify')
          this.spinner = false
          this.close(true)
         
        },
        error: (error) => {
          this.spinner = false
          this._snackBarService.openSnackbar('❌' + error.error.message)
        },
      })
    }
  }

  verifyCustomUserOpt(): void {
    if (this.userData?.email != '' && this.emailotp?.value.length == 6) {
      this.spinner = true
      this._authService.guestEmailVerifyOtp({ email: this.userData?.email, otp: this.emailotp?.value }).subscribe({
        next: (res) => {  
          console.log(res)
          this._snackBarService.openSnackbar('✔ Successfully OTP verify')
          this.spinner = false
          this.close(true)
        },
        error: (error) => {
          this.spinner = false
          this._snackBarService.openSnackbar('❌' + error.error.error)
        },
      })
    }
  }


  

}


