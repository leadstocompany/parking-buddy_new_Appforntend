import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import data from './country.json'

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent {
  generalForm!: FormGroup
  country: Array<string> = data.country;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.generalForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      shuttleNumber: ['', Validators.required],
      flexNumber: ['', Validators.required],
      shuttleBus: ['',]
    })
  }

  onSubmit() {
  }


  public saveForm(event: any) {
    console.log(this.generalForm.controls)
    this.validate(event)
  }

  validate(event: any) {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }
}
