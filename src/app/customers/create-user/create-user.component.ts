import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  profileForm!: FormGroup;
  pymentPage!: boolean
  public passwordHide: boolean = true;
  public confirmPasswordHide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private _customer: CustomerService,
    private _snackBar: SnackbarService,
    private _activeRoute: ActivatedRoute,
    private _rout: Router
  ) { }

  ngOnInit() {
    // this._activeRoute.queryParams.subscribe((queryParams) => {
    //   console.log(queryParams,'query')
    //   if(Object.keys(queryParams).length){
    //     console.log('query')
    //     if(queryParams['user']=='user'){

    //     }
    //   }else{
    //     console.log('notquery')
    //   }
    // })
    this.profileForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      currentPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)]],
      confirmPassword: ['', [Validators.required]],
      plateNo: ['', [Validators.required]],
      state: ['', [Validators.required]],
      makeModle: ['', Validators.required]
    });
  }

  public AddProfile(): void {
    const pyload = {
      "first_name": this.profileForm.value.first_name,
      "last_name": this.profileForm.value.last_name,
      "email": this.profileForm.value.email,
      "mobile": this.profileForm.value.mobile,
      "phone_number": this.profileForm.value.phone,
      "zipcode": this.profileForm.value.zipcode,
      "car_plate_no": this.profileForm.value.plateNo,
      "state": this.profileForm.value.state,
      "password": this.profileForm.value.currentPassword,
      "user": 'customer',
      "car_model": this.profileForm.controls['makeModle'].value
    }

    this._customer.createUser(pyload).subscribe({
      next: (res) => {
        console.log(res)
        this._snackBar.openSnackbar('✔ form Successfully Submitted')
        this._rout.navigate(['/customers'])
      },
      error: (error) => {
        console.log(error)
        this._snackBar.openSnackbar('❌' + error.error.email[0])
      }
    })


  }
}
