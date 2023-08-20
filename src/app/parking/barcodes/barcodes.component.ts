import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodesService } from 'src/app/service/barcodes.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-barcodes',
  templateUrl: './barcodes.component.html',
  styleUrls: ['./barcodes.component.scss']
})
export class BarcodesComponent {
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
  constructor(private _formBuilder: FormBuilder, private _barCodeService: BarcodesService, private _snackbarService: SnackbarService) { }
  spinner = false
  ngOnInit(): void {
    this.barCodes = this._formBuilder.group({
      product: ['Self Uncovered'],
      barcodeVersion: ['code39_default'],
      barcodeText: ['Customer Reservation ID'],
      date: [new Date()]
    })
  }
  public createBarcode(): void {
    console.log(this.barCodes.value)
    this.spinner = true
    const data = {
      "version": this.barCodes.value.barcodeVersion,
      "text": this.barCodes.value.barcodeText,
      "date": new Date(this.barCodes.value.date).toISOString().split('T')[0],
      "property": localStorage.getItem('detailsId'),
      "product": localStorage.getItem('productId'),
    }
    this._barCodeService.createBarCodes(data).subscribe({
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
