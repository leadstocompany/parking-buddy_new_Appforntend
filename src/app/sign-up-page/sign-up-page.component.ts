import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../service/snackbar.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
  signupForm!: FormGroup;
  spinner:boolean=false
  public passwordHide: boolean = true;
  public ConfirmPasswordHide: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _snackBarService: SnackbarService, private _router: Router) { }

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.signupForm?.valid) {
      this.spinner = true
      const data = {
        "first_name": this.signupForm.value.firstName,
        "last_name": this.signupForm.value.lastName,
        "email": this.signupForm.value.email,
        "mobile": this.signupForm.value.phone,
        "password": this.signupForm.value.password
      }

      this._authService.registerUser(data).subscribe({
        next: (res) => {
          //console.log(res)
          this.spinner = false
          this._snackBarService.openSnackbar('✔ Successfully Registered')
          this._router.navigate(['/signIN'])
        },
        error: (error) => {
          //console.log(error)
          this.spinner = false
          this._snackBarService.openSnackbar('❌' + error.error.message)
        }
      })

    }
  }
}
