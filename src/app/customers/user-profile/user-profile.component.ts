import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  selected = new FormControl(0);
  profileForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      zipcode: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      currentPassword: ['', [Validators.required]],
      nPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      plateNo: ['', [Validators.required]],
      state: ['', [Validators.required]]
    });
  }
  logOut(event: any) {
    if (event == 2) {
      alert("log out")
    }
  }

  EditProfile() {
    alert('enter')
    console.log(this.profileForm.value)
  }
}
