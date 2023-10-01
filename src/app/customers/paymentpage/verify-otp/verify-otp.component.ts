import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  otp!: any;
  emailAddress!: any;
  constructor(
    private _dialogRef: MatDialogRef<VerifyOtpComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: any,
    private _authService: AuthService,
    private _snackBarService: SnackbarService
  ) { }

  ngOnInit() {
    this.emailAddress = this.userData?.email
  }

  public close(bool: boolean): void {
    this._dialogRef.close({ verify: bool })
  }

  verifyEmailOtp(): void {
    if (this.userData?.email != '' && this.otp.length == 6) {
      this._authService.emailVerifyOtp({ email: this.userData?.email, otp: this.otp?.value }).subscribe({
        next: (res) => {
          this.close(true)
          this._snackBarService.openSnackbar('✔ Successfully OTP verify')
        },
        error: (error) => {
          this._snackBarService.openSnackbar('❌' + error.error.message)
        },
      })
    }
  }

}
