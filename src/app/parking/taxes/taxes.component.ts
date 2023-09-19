import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TaxesService } from 'src/app/service/taxes.service';
import currency from '../ACurrency.json'
import { DetailsService } from 'src/app/service/details.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss']
})
export class TaxesComponent {
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
  taxData: any = []
  editData: any;
  taxId: any
  amountIcon = '₹'
  currency: any = currency?.currency
  constructor(private _detailService: DetailsService,private _formBuilder: FormBuilder, private _taxeService: TaxesService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
  ngOnInit() {
    this.taxes = this._formBuilder.group({
      category: [null],
      amountType: [null],
      amount: [null],
      type: [null],
      applyTax: [null],
      postTaxCal: [null]
    })

    // Check edit or not 
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getText(this.editData.id)
      this.getProperty(this.editData.id)
    } else if (this.editData.edit === false) {
      this.getText(this._saveService.getPropertyId())
      this.getProperty(this._saveService.getPropertyId())
    }
  }

  // Create tex 
  public createTax(): void {
    this.spinner = true
    const data = {
      "category": this.taxes.controls['category'].value,
      "amount_type": this.taxes.controls['amountType'].value,
      "amount": this.taxes.controls['amount'].value,
      "type": this.taxes.controls['type'].value,
      "apply": this.taxes.controls['applyTax'].value,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }

    this._taxeService.createTaxService(data).subscribe({
      next: (res) => {
        console.log(res)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.spinner = false
        if (this.editData.edit) {
          this.getText(this.editData.id)
        } else {
          this.getText(this._saveService.getPropertyId())
        }
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })
  }

  // get tex 
  public getText(id: any) {
    this._taxeService.getTaxesfeesById(id).subscribe({
      next: (res) => {
        console.log(res, 'get taxes ---')
        this.taxData = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }



  //  Update text 
  public updateTax(): void {
    this.spinner = true
    const data = {
      data: {
        "category": this.taxes.controls['category'].value,
        "amount_type": this.taxes.controls['amountType'].value,
        "amount": this.taxes.controls['amount'].value,
        "type": this.taxes.controls['type'].value,
        "apply": this.taxes.controls['applyTax'].value,
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      },
      id: this.taxId
    }

    this._taxeService.updateTaxesfess(data).subscribe({
      next: (res) => {
        console.log(res)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.spinner = false
        if (this.editData.edit) {
          this.getText(this.editData.id)
        } else {
          this.getText(this._saveService.getPropertyId())
        }
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })
  }

  // set values
  public openEditModal(data: any) {
    console.log(data)
    this.taxId = data.id
    this.taxes.setValue({
      category: data.category,
      amountType: data.amount_type,
      amount: data.amount,
      type: data.type,
      applyTax: data.apply,
      postTaxCal: '',
    })
  }


  public updateTex(): void {
    this.spinner = true
    const data = {
      data: {
        "category": this.taxes.controls['category'].value,
        "amount_type": this.taxes.controls['amountType'].value,
        "amount": this.taxes.controls['amount'].value,
        "type": this.taxes.controls['type'].value,
        "apply": this.taxes.controls['applyTax'].value,
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      },
      id: this.taxId
    }

    this._taxeService.updateTaxesfess(data).subscribe({
      next: (res) => {
        console.log(res)
        if (this.editData.edit) {
          this.getText(this.editData.id)
        } else {
          this.getText(this._saveService.getPropertyId())
        }
        this._snackbarService.openSnackbar('✔ Form Successfully updated')
        this.spinner = false
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        this.spinner = false
      }
    })
  }


  public deleteTex(id: any) {
    this._taxeService.deleteTexById(id).subscribe({
      next: (res) => {
        if (this.editData.edit) {
          this.getText(this.editData.id)
        } else {
          this.getText(this._saveService.getPropertyId())
        }

        this._snackbarService.openSnackbar('✔ Record Successfully Deleted')
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public getProperty(id: any) {
    this._detailService.getSingleBasicDetailsService(id).subscribe({
      next: (res) => {
        console.log(res, 'res')
        this.amountIcon = this.currency[`${res.country}`]
      },
      error: (error:any) => {
        console.log(error)
        this.spinner = false
        this._snackbarService.openSnackbar('❌ '+error.error[0])
      }
    })
  }

}
