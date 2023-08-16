import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(private _formBuilder:FormBuilder){}

  ngOnInit():void{
    this.barCodes = this._formBuilder.group({
      product:['Self Uncovered'],
      barcodeVersion:['code39_default'],
      barcodeText:['Customer Reservation ID'],
      date:[new Date()]
    })
  }
  public createBarcode():void{
    console.log(this.barCodes.value)
  }
}
