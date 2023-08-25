import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodesService } from 'src/app/service/barcodes.service';
import { ProductsService } from 'src/app/service/products.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';


@Component({
  selector: 'app-all-blackouts',
  templateUrl: './all-blackouts.component.html',
  styleUrls: ['./all-blackouts.component.scss']
})
export class AllBlackoutsComponent {
  public parkingOptions: any = []
  blackouts!: FormGroup
  spinner = false
  document: any;
  blId: any;
  editData: any;
  constructor(private _formBuilder: FormBuilder, private _barAndBlackService: BarcodesService, private _productService: ProductsService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
  ngOnInit() {
    this.blackouts = this._formBuilder.group({
      product: [null],
      blackoutsType: [null],
      date: [new Date(), new Date()],
      cars: [null],
      recurrence: ['On'],
      allowedDay: [null]
    })
    // Check edit or not 
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getProduct(this.editData.id)
      this.getBlackouts(this.editData.id)
    } else if (this.editData.edit === false) {
      this.getProduct(this._saveService.getPropertyId())
      this.getBlackouts(this._saveService.getPropertyId())
    }

  }

  public createBlackout(): void {
    this.spinner = true
    const data = {
      "product": this.blackouts.controls['product'].value,
      "type": this.blackouts.controls['blackoutsType'].value,
      "start_date": new Date(this.blackouts.controls['date'].value[0]).toISOString().split('T')[0],
      "end_date": new Date(this.blackouts.controls['date'].value[1]).toISOString().split('T')[0],
      "cars": this.blackouts.controls['cars'].value,
      "recurrence_rule": this.blackouts.controls['recurrence'].value == 'On' ? true : false,
      "parking_allowed": this.blackouts.controls['allowedDay'].value,
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
    }

    this._barAndBlackService.createBlackouts(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        if (this.editData.edit) {
          this.getBlackouts(this.editData.id)
        } else {
          this.getBlackouts(this._saveService.getPropertyId())
        }
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false

      }
    })
  }

  public getProduct(id: any) {
    this._productService.getProductById(id).subscribe({
      next: (res) => {
        this.parkingOptions = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public openEditModal(data: any) {
    console.log(data)
    this.saveBlackout(data)
  }

  public getBlackouts(id: any) {
    this._barAndBlackService.getBlackoutsById(id).subscribe({
      next: (res) => {
        this.document = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  saveBlackout(value: any) {
    this.blId = value.id
    this.blackouts.setValue({
      product: value.product.id,
      blackoutsType: value.type,
      date: [new Date(value.start_date), new Date(value.end_date)],
      cars: value.cars,
      recurrence: value.recurrence_rule ? "On" : "Off",
      allowedDay: value.parking_allowed
    })
  }

  clearBlackout() {
    this.blackouts.reset()
  }

  public UpdateBlackout(): void {
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
        "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId()
      },
      id: this.blId
    }
    this._barAndBlackService.updateBlackouts(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        if (this.editData.edit) {
          this.getBlackouts(this.editData.id)
        } else {
          this.getBlackouts(this._saveService.getPropertyId())
        }
        this._snackbarService.openSnackbar('✔ Form Successfully Updated')
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false

      }
    })

  }

  public deleteBlackout(id: any) {
    this._barAndBlackService.deleteBlackoutsById(id).subscribe({
      next: (res) => {
        if (this.editData.edit) {
          this.getBlackouts(this.editData.id)
        } else {
          this.getBlackouts(this._saveService.getPropertyId())
        }

        this._snackbarService.openSnackbar('✔ Record Successfully Deleted')
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
