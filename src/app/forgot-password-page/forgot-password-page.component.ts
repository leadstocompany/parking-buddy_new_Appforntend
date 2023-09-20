import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { AuthService } from '../service/auth/auth.service';


@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {
  // Form groups for each step
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  passwordForm!: FormGroup;
  otp!: FormControl
  // Step tracking
  currentStep: number = 1;
  // Inside your PasswordResetComponent
  passwordVisible: boolean = true;
  confirmPasswordVisible: boolean = true;
  user!: string
  otpSent: boolean = false
  verifyOtp: boolean = false
  constructor(
    private fb: FormBuilder,
    private _customerService: CustomerService,
    private _authService: AuthService,
    private _snackbarService: SnackbarService,
    private _router: Router,
    private _activeRouter: ActivatedRoute
  ) {
    // Initialize form groups with validation
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.otp = new FormControl('', [Validators.required]);
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this._activeRouter.queryParams.subscribe((queryParams) => {
      this.user = queryParams['user']
    });
  }
  // Function to navigate to the next step
  nextStep() {
    this.currentStep++;
  }
  // Function to navigate to the previous step
  prevStep() {
    this.currentStep--;
  }

  public sendOtp(): void {
    this._authService.sentOptOnEmail({ email: this.emailForm.controls['email'].value }).subscribe({
      next: (res) => {
        this.otpSent = true
      },
      error: (error) => {
        this._snackbarService.openSnackbar('❌' + error.error[0])
      }
    })
  }

  public verifyEmail(): void {
    this._authService.verifyOptOnEmail({ email: this.emailForm.controls['email'].value, otp: this.otp.value }).subscribe({
      next: (res) => {
        this.otpSent = true
        this.verifyOtp = true
      },
      error: (error) => {
        this._snackbarService.openSnackbar('❌' + error.error[0])
      }
    })
  }

  public wrongEmail(): void {
    this.otpSent = false
  }
  
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (field === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  forgotPassword() {
    if (this.passwordForm.controls['password'].value !== this.passwordForm.controls['confirmPassword'].value) {
      this._snackbarService.openSnackbar(`❌new password and confirm password not matched`)
      return
    } else {
      const data = {
        email: this.emailForm.controls['email'].value,
        new_password: this.passwordForm.controls['password'].value
      }
      this._authService.resetPassword(data).subscribe({
        next: (res) => {
          this._snackbarService.openSnackbar('✔ Password Change Successfully')
          if (this.user == 'CUSTOM77484ER85487548400UHGBVVGHJIHHGHHGHBNM45125445874FDC5844J') {
            this._router.navigate(['/customers/sign-in'])
          } else if (this.user == 'ADMIN77484ER85487548400UHGBVVGHJIHHGHHGHBNM45125445874FDC5844J') {
            this._router.navigate(['/signIN'])
          } else {
            this._router.navigate(['/customers'])
          }
        },
        error: (error) => {
          this._snackbarService.openSnackbar('❌' + error.error[0])
        }
      })
    }
  }

}
