import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BarcodesService } from 'src/app/service/barcodes.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-edit-barcodes',
  templateUrl: './edit-barcodes.component.html',
  styleUrls: ['./edit-barcodes.component.scss']
})
export class EditBarcodesComponent {
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
  public barCodes !: FormGroup;
  constructor(
    private _formBuilder: FormBuilder,
    private _barCodeService: BarcodesService,
    private _snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }
  spinner = false
  barId: any
  propId: any
  ngOnInit(): void {
    this.barCodes = this._formBuilder.group({
      product: ['Self Uncovered'],
      barcodeVersion: ['code39_default'],
      barcodeText: ['Customer Reservation ID'],
      date: [new Date()]
    })

    this.getBarCode();
  }
  public updateBarCode(): void {
    this.spinner = true
    const data = {
      "version": this.barCodes.value.barcodeVersion,
      "text": this.barCodes.value.barcodeText,
      "date": new Date(this.barCodes.value.date).toISOString().split('T')[0],
      "property": this.data.id,
      "product": this.propId,
    }
    const fd = {
      data: data,
      id: this.barId
    }

    this._barCodeService.updateBarCodes(fd).subscribe({
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

  public getBarCode(): void {
    this._barCodeService.getBarCodesById(this.data.id).subscribe({
      next: (res) => {
        console.log(res)
        this.barId = res[0].id,
          this.propId = res[0].product
        this.setValues(res[0])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public setValues(data: any) {
    this.barCodes.setValue({
      product: data.product,
      barcodeVersion: data.version,
      barcodeText: data.text,
      date: new Date(data.date)
    })
  }
}
