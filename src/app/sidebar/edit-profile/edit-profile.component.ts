// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  selectedFile!: File;
  previewImage: any;
  constructor(
    private fb: FormBuilder,
    private _auth: AuthService,
    public dialogRef: MatDialogRef<EditProfileComponent>
  ) { }

  ngOnInit() {
    // Initialize the form with user data
    this.profileForm = this.fb.group({
      fname: ['John'],
      lname: ['Doe'],
      phone: ['956823654'],
      email: ['john@example.com'],
      bio: [''],
    });

    this.getUserData()
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


onSubmit() {
  const formData = new FormData();
  formData.append('profileImage', this.selectedFile);
  console.log(this.profileForm.value)
  this.closeDialog()
}

closeDialog() {
  this.dialogRef.close();
}

  public getUserData() {
  this._auth.getUser().subscribe({
    next: (res) => {
      console.log(res, 'user data')
      // this.fullName = res.first_name + ' ' + res.last_name
      this.profileForm.setValue({
        fname: res.first_name,
        lname: res.last_name,
        phone: res.mobile,
        email: res.email,
        bio: res.bio ? res.bio : '',
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}
}
