import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TaxesService } from 'src/app/service/taxes.service';

@Component({
  selector: 'app-edit-taxes-and-fess',
  templateUrl: './edit-taxes-and-fess.component.html',
  styleUrls: ['./edit-taxes-and-fess.component.scss']
})
export class EditTaxesAndFessComponent {
  
  public taxList: string[] = [
    '✓ 10% Airport Tax',
    '10% City of Chicago Tax',
    '6.00% Sales Tax',
    '6.5% Sales Tax',
    '7% Sales Tax',
    '8% Airport/Seaport Tax',
    'Airport Access Fee Airport Access Fee and Fuel Surcharge',
    'Airport Access Payment',
    'Airport Use Recovery Fee',
    'Arizona Transaction Privilege Sales Tax',
    'City of Philadelphia Sales Tax',
    'City Parking Tax/Fee',
    'City Privilege Sales Tax',
    'or do Sala City Tax',
    'County Tax',
    'Daily County Tax',
    'Fuel Surcharge',
    'City Lenovo',
    'Illinois State Tax',
    'Living Wage Charge',
    'Location Fee',
    'Fuel Surcharge',
    'Illinois State Tax Living Wage Charge',
    'Location Fee',
    'Mass Transit Access Parking Tax',
    'Occupancy Tax',
    'Parking Excise Tax',
    'Parking Tax',
    'Patron Parking Tax',
    'Port Fee',
    'Privilege Fee Recovery Charge',
    'Recovery Fee',
    'Sales Tax',
    'State Tax',
    'Tax',
    'Tax & Surcharge',
    'Taxes & Surcharges',
    'Trip Fee'
  ];
  taxes!: FormGroup
  spinner = false
  constructor(private _formBuilder: FormBuilder, private _taxeService: TaxesService,private _snackbarService: SnackbarService) { }
  
  ngOnInit() {
    this.taxes = this._formBuilder.group({
      category: [null],
      amountType: [null],
      amount: [null],
      type: [null],
      applyTax: [null],
      postTaxCal: [null]
    })
  }
  public createTax(): void {
    // const formData = new FormData();
    // formData.append('', this.taxes.controls[''].value)
    // formData.append('', this.taxes.controls[''].value)
    // formData.append('', this.taxes.controls[''].value)
    // formData.append('', this.taxes.controls[''].value)
    // formData.append('', this.taxes.controls[''].value)
    // formData.append('', this.taxes.controls[''].value)
    this.spinner = true
    const data = {
      "category": this.taxes.controls['category'].value,
      "amount_type": this.taxes.controls['amountType'].value,
      "amount": this.taxes.controls['amount'].value,
      "type": this.taxes.controls['type'].value,
      "apply": this.taxes.controls['applyTax'].value,
      "property":localStorage.getItem('detailsId')
  }
  
    this._taxeService.createTaxService(data).subscribe({
      next: (res) => {
        console.log(res)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.spinner = false
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false
      }
    })
  }

}
