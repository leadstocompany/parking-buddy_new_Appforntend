import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ShowReservationComponent } from './show-reservation/show-reservation.component';
import { WarningComponentComponent } from '../warning-component/warning-component.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  selected = new FormControl(0);
  profileForm!: FormGroup;
  public pastReservationData: Array<any> = [];
  public openReservationData: Array<any> = [];
  public reservationStatus: string = 'open';

  constructor(
    private fb: FormBuilder,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      // currentPassword: ['', [Validators.required]],
      // nPassword: ['', [Validators.required]],
      // confirmPassword: ['', [Validators.required]],
      plateNo: ['', [Validators.required]],
      state: ['', [Validators.required]],
      makeModle: ['', Validators.required]
    });

    this._openReservationDetails()
  }
  logOut(event: any) {
    if (event == 2) {
      alert("log out")
    }
    else if (event == 1) {
      this._getProfileDetails()
    }
    else if (event == 0) {
      if (this.reservationStatus.includes('open')) {
        this._openReservationDetails();
      } else if (this.reservationStatus.includes('past')) {
        this._pastReservationDetails()
      }
    }
  }

  public onTabChangeReservation(event: any): void {
    if (event.index == 0) {
      this.reservationStatus = 'open'
      this._openReservationDetails()
    }
    else if (event.index == 1) {
      this.reservationStatus = 'past'
      this._pastReservationDetails()
    }
  }

  private _openReservationDetails(): void {
    this._customerService.getOpenReservationDetails().subscribe({
      next: (res) => {
        //console.log('res ==>', res);
        this.pastReservationData = []
        this.openReservationData = res
      },
      error: (error: any) => {
        this._snackbarService.openSnackbar(`❌ ` + error.error[0])
      },
    })
  }

  private _pastReservationDetails(): void {
    this._customerService.getPastReservationDetails().subscribe({
      next: (res) => {
        //console.log('past res ==>', res);
        this.openReservationData = []
        this.pastReservationData = res
      },
      error: (error: any) => {
        //console.log(error);
        this._snackbarService.openSnackbar(`❌ ` + error.error[0])
      },
    })
  }

  private _getProfileDetails(): void {
    this._customerService.getProfileDetails().subscribe({
      next: (res) => {
        //console.log('profile res ==>', res);
        const data = res
        this.profileForm.patchValue({
          fname: data.first_name,
          lname: data.last_name,
          email: data.email,
          mobile: data.mobile,
          phone: data.phone_number,
          zipcode: data.zipcode,
          plateNo: data.car_plate_no,
          state: data.state,
          makeModle: data.car_model ? data.car_model : ""
        })
      },
      error: (error: any) => {
        //console.log(error);
        this._snackbarService.openSnackbar(`❌ ` + error.error[0])
      },
    })
  }

  public forgotPasswordDialog(): void {
    const dialogRef = this._dialog.open(ForgotPasswordComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        userName: this.profileForm.controls['email'].value
      }
    });

    // dialogRef.afterClosed().subscribe((res) => {
    //   this.ngOnInit()
    // })
  }

  public EditProfile() {
    const data = {
      first_name: this.profileForm.controls['fname'].value,
      last_name: this.profileForm.controls['lname'].value,
      email: this.profileForm.controls['email'].value,
      mobile: this.profileForm.controls['mobile'].value,
      phone_number: this.profileForm.controls['phone'].value,
      zipcode: this.profileForm.controls['zipcode'].value,
      car_plate_no: this.profileForm.controls['plateNo'].value,
      state: this.profileForm.controls['state'].value,
      car_model: this.profileForm.controls['makeModle'].value
    }
    this._customerService.updateProfile(data).subscribe({
      next: (res) => {
        //console.log('res ==>', res);
        this._snackbarService.openSnackbar('✔ Profile Update Successfully')
      },
      error: (error: any) => {
        //console.log(error);
        this._snackbarService.openSnackbar(`❌ ` + error.error[0])
      },
    })
  }

  viewOpen(id: any): void {
    this._dialog.open(ShowReservationComponent, {
      autoFocus: false,
      disableClose: false,
      data: {
        id: id
      }
    });
  }

  public cancelReservations(id: any): void {
    const dialogRef = this._dialog.open(WarningComponentComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      this._openReservationDetails()
    })
    // this._customerService.cancelReservation(id).subscribe({
    //   next: (res) => {
    //     if (res.error) {
    //       this._snackbarService.openSnackbar(`❌ ` + res.error)
    //     } else {
    //       this._openReservationDetails()
    //       this._snackbarService.openSnackbar(`❌ ` + res.message)
    //     }
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //     this._snackbarService.openSnackbar(`❌ ` + error.error[0])
    //   },
    // })
  }

  viewPast(index: number): void {
  }

}
