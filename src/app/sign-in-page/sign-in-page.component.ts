import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { SnackbarService } from '../service/snackbar.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  signInForm!: FormGroup;
  spinner: boolean = false
  public url: string = ''
  public passwordHide: boolean = true;
  public emailVerify: boolean = false;
  public otpVerify: boolean = false;
  public password: boolean = true;
  public passwordShow: boolean = true
  otp!: FormControl
  admin = false

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _snackBarService: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.otp = new FormControl('', [Validators.required]);
    const currentUrl = this._router.url
    if (currentUrl.includes('/customers')) {
      this.url = '/customers/sign-up'
      this.admin = false
    } else {
      this.url = '/signUP'
      this.admin = true
    }
  }

  public signUp(): void {

  }

  verifyEmail(): void {
    if (this.signInForm.controls['email'].value != '') {
      this.spinner = true
      this._authService.emailVerifySendOtp({ email: this.signInForm.value.email }).subscribe({
        next: (res) => {
          this.spinner = false
          this.emailVerify = false
          this.otpVerify = true
          this.passwordShow = false
          this._snackBarService.openSnackbar('✔ Successfully OTP Send')
        },
        error: (error) => {
          this._snackBarService.openSnackbar('❌' + error.error.message)
        },
      })
    }
  }

  verifyEmailOtp(): void {
    if (this.signInForm.controls['email'].value != '' && this.otp.value.length == 6) {
      this.spinner = true
      this._authService.emailVerifyOtp({ email: this.signInForm.value.email, otp: this.otp.value }).subscribe({
        next: (res) => {
          if (res.message) {
            this.spinner = false
            this.otpVerify = false
            this.password = true
            this.passwordShow = true
            this._snackBarService.openSnackbar('✔ Successfully OTP verify')
          } else {
            this._snackBarService.openSnackbar('❌' + res.error)
          }
        },
        error: (error) => {
          //console.log(error)
          this.spinner = false
          this._snackBarService.openSnackbar('❌' + error.error.error)
        },
      })
    }
  }

  submitForm() {
    if (this.signInForm?.valid) {
      this.spinner = true
      const data = {
        "username": this.signInForm.value.email,
        "password": this.signInForm.value.password
      }
      this._authService.loginUser(data).subscribe({
        next: (res) => {
          //console.log(res, '=====>')
          if (res?.data?.active) {
            localStorage.setItem('accessToken', res.data.auth_token.access)
            this._snackBarService.openSnackbar('✔ Successfully logged In')
            if (res.data.role == 'normal_user') {
              this.spinner = false
              this._router.navigate(['/customers'])
            }
            else if (res.data.role == 'vendor') {
              this._router.navigate(['/parking'])
            }
          } else {
            this._snackBarService.openSnackbar('Please verify your email')
            this.spinner = false
            this.emailVerify = true
            this.passwordShow = false
          }
        },
        error: (error) => {
          //console.log(error)
          this.spinner = false
          this._snackBarService.openSnackbar('❌' + error.error.message)
        }
      })
    }
  }

  public forgotPassword() {
    const currentUrl = this._router.url
    if (currentUrl.includes('/customers')) {
      this.url = '/customers/sign-up'
      const queryParams = { user: environment.USER_URL }
      this._router.navigate(['/reset-password'], { queryParams })
    } else {
      const queryParams = { user: environment.ADMIN_URL }
      this._router.navigate(['/reset-password'], { queryParams })
    }
  }
}
