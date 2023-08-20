import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';
import { SnackbarService } from '../service/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {
  signInForm!: FormGroup;
  spinner: boolean = false
  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _snackBarService: SnackbarService, private _router: Router) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
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
          console.log(res)
          this.spinner = false
          this._snackBarService.openSnackbar('✔ Successfully logged In')
          this._router.navigate(['/parking'])

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
