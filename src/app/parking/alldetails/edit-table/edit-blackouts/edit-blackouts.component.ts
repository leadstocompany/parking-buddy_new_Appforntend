import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodesService } from 'src/app/service/barcodes.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-edit-blackouts',
  templateUrl: './edit-blackouts.component.html',
  styleUrls: ['./edit-blackouts.component.scss']
})
export class EditBlackoutsComponent {

  public parkingOptions: string[] = [
    'Self Uncovered',
    'Self Rooftop',
    'Self Indoor',
    'Valet Indoor',
    'Valet Covered',
    'Valet Ur',
    'Valet Rooftop',
    'Valet Curbside',
    'Self Uncovered - Oversized',
    'Self Covered - Oversized',
    'Self Indoor - Oversized',
    'Self Rooftop - Oversized',
    'Self Curbside - Oversized',
    'Valet Uncovered - Oversized',
    'Valet Covered - Oversized',
    'Valet Indoor - Oversized',
    'Valet Rooftop - Oversized',
    'Valet Curbside - Oversized'
  ];
  blackouts!: FormGroup
  spinner = false
  constructor(private _formBuilder: FormBuilder, private _barAndBlackService: BarcodesService, private _snackbarService: SnackbarService) { }
  ngOnInit() {
    this.blackouts = this._formBuilder.group({
      product: [null],
      blackoutsType: [null],
      date: [new Date(), new Date()],
      cars: [null],
      recurrence: ['On'],
      allowedDay: [null]
    })
  }

  public createBlackout(): void {
    // const formData = new FormData();
    // formData.append('',this.blackouts.controls['product'].value)
    // formData.append('',this.blackouts.controls['blackoutsType'].value)
    // formData.append('',this.blackouts.controls['date'].value)
    // formData.append('',this.blackouts.controls['cars'].value)
    // formData.append('',this.blackouts.controls['recurrence'].value)
    // formData.append('',this.blackouts.controls['allowedDay'].value)
    // console.log(this.blackouts.controls['date'].value[0])
    // console.log(this.blackouts.controls['date'].value[1])
    this.spinner = true
    const data = {
      "product": this.blackouts.controls['product'].value,
      "type": this.blackouts.controls['blackoutsType'].value,
      "start_date": new Date(this.blackouts.controls['date'].value[0]).toISOString().split('T')[0],
      "end_date": new Date(this.blackouts.controls['date'].value[1]).toISOString().split('T')[0],
      "cars": this.blackouts.controls['cars'].value,
      "recurrence_rule": this.blackouts.controls['recurrence'].value == 'On' ? true : false,
      "parking_allowed": this.blackouts.controls['allowedDay'].value,
      "property": localStorage.getItem('detailsId')
    }
    this._barAndBlackService.createBlackouts(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false

      }
    })

  }


}
