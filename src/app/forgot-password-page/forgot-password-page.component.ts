import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';


@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {
  selected = new FormControl(0);
  profileForm!: FormGroup;
  user!: string
  constructor(
    private fb: FormBuilder,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    private _router: Router,
    private _activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required]],
      nPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });

    this._activeRouter.queryParams.subscribe((queryParams) => {
      // this.results = JSON.parse(queryParams['data']);
      // queryParams['checkIn']
      this.user = queryParams['user']
    });
  }
  public changePassword(): void {
    if (this.profileForm.controls['nPassword'].value !== this.profileForm.controls['confirmPassword'].value) {
      this._snackbarService.openSnackbar(`❌new password and confirm password not matched`)
      return
    } else {
      const data = {
        email: this.profileForm.controls['email'].value,
        new_password: this.profileForm.controls['nPassword'].value
      }
      this._customerService.changePassword(data).subscribe({
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
        error: (error:any) => {
          console.log(error);
          this._snackbarService.openSnackbar(`❌ `+error.error[0])
        },
      })
    }
  }
}
