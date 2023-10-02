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
    //console.log(this.selectedFile);
    //console.log(this.profileForm.value)
    //console.log(this.previewImage)

    const data = {
      "first_name": this.profileForm.value.fname,
      "last_name": this.profileForm.value.lname,
      "email": this.profileForm.value.email,
      "mobile": this.profileForm.value.phone,
      "bio": this.profileForm.value.bio,
      "image": this.selectedFile
    }
    this._auth.UpdateUser(data).subscribe({
      next: (res) => {
        this.getUserData()
        this.closeDialog()
      },
      error: (error) => {
        //console.log(error)
      }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  public getUserData() {
    this._auth.getUser().subscribe({
      next: (res) => {
        this.profileForm.setValue({
          fname: res.first_name,
          lname: res.last_name,
          phone: res.mobile,
          email: res.email,
          bio: res.bio ? res.bio : '',
        })
        // this.previewImage = res.image ? res.image : ''
      },
      error: (error) => {
        //console.log(error)
      }
    })
  }
}
