// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  selectedFile!: File;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>
  ) { }

  ngOnInit() {
    // Initialize the form with user data
    this.profileForm = this.fb.group({
      fname: ['John'],
      lname:['Doe'],
      phone:['956823654'],
      email: ['john@example.com'],
      bio: [''],
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('profileImage', this.selectedFile);
    console.log(this.profileForm.value)
    this.closeDialog()
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
