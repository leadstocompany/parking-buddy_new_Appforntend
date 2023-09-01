import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
      fname: [''],
      lname: [''],
      phone: [''],
      email: [''],
      zipcode: [''],
      mobile: [''],
      currentPassword: [''],
    });
  }
  logOut(event: any) {
    if (event == 2) {
      alert("log out")
    }
  }
}
