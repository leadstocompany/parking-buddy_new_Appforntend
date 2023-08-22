import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  blId: any
  constructor(
    private _formBuilder: FormBuilder,
    private _barAndBlackService: BarcodesService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: any

  ) { }

  ngOnInit() {
    this.blackouts = this._formBuilder.group({
      product: [null],
      blackoutsType: [null],
      date: [new Date(), new Date()],
      cars: [null],
      recurrence: ['On'],
      allowedDay: [null]
    })
    this.getBlackOuts()
  }

  public createBlackout(): void {
    this.spinner = true
    const data = {
      data: {
        "product": this.blackouts.controls['product'].value,
        "type": this.blackouts.controls['blackoutsType'].value,
        "start_date": new Date(this.blackouts.controls['date'].value[0]).toISOString().split('T')[0],
        "end_date": new Date(this.blackouts.controls['date'].value[1]).toISOString().split('T')[0],
        "cars": this.blackouts.controls['cars'].value,
        "recurrence_rule": this.blackouts.controls['recurrence'].value == 'On' ? true : false,
        "parking_allowed": this.blackouts.controls['allowedDay'].value,
        "property": this.data.id
      },
      id: this.blId
    }
    this._barAndBlackService.updateBlackouts(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Updated')
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false

      }
    })

  }

  public getBlackOuts(): void {
    this._barAndBlackService.getBlackoutsById(this.data.id).subscribe({
      next: (res) => {
        console.log(res, 'black outs')
        this.saveBlackout(res[0])
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

  saveBlackout(value: any) {
    console.log(value, 'values===============')
    this.blId = value.id
    this.blackouts.setValue({
      product: '',
      blackoutsType: value.type,
      date: [new Date(value.start_date), new Date(value.end_date)],
      cars: value.cars,
      recurrence: value.recurrence_rule ? "On" : "Off",
      allowedDay: value.parking_allowed
    })
  }


}
