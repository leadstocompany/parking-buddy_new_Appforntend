import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-quick-sign-in',
  templateUrl: './quick-sign-in.component.html',
  styleUrls: ['./quick-sign-in.component.scss']
})
export class QuickSignInComponent {

  signInForm!: FormGroup;
  spinner: boolean = false
  public passwordHide: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<QuickSignInComponent>,
    private _authService: AuthService,
    private _snackBarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  public close(): void {
    this._dialogRef.close()
  }

  public signIn(): void {
    if (this.signInForm?.valid) {
      this.spinner = true
      const data = {
        "username": this.signInForm.value.email,
        "password": this.signInForm.value.password
      }
      this._authService.loginUser(data).subscribe({
        next: (res) => {
          localStorage.setItem('accessToken', res.data.auth_token.access)
          this.spinner = false
          this._snackBarService.openSnackbar('✔ Successfully logged In')
          if (res.data.role == 'normal_user') {
            this._dialogRef.close()
          }
        },
        error: (error) => {
          console.log(error)
          this.spinner = false
          this._snackBarService.openSnackbar('❌' + error.error.message)
        }
      })
    }
  }
}
