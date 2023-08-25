import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BarcodesService } from 'src/app/service/barcodes.service';
import { ProductsService } from 'src/app/service/products.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-barcodes',
  templateUrl: './barcodes.component.html',
  styleUrls: ['./barcodes.component.scss']
})
export class BarcodesComponent {
  // public parkingOptions: string[] = [
  //   'Self Uncovered',
  //   'Self Rooftop',
  //   'Self Indoor',
  //   'Valet Indoor',
  //   'Valet Covered',
  //   'Valet Ur',
  //   'Valet Rooftop',
  //   'Valet Curbside',
  //   'Self Uncovered - Oversized',
  //   'Self Covered - Oversized',
  //   'Self Indoor - Oversized',
  //   'Self Rooftop - Oversized',
  //   'Self Curbside - Oversized',
  //   'Valet Uncovered - Oversized',
  //   'Valet Covered - Oversized',
  //   'Valet Indoor - Oversized',
  //   'Valet Rooftop - Oversized',
  //   'Valet Curbside - Oversized'
  // ];

  public parkingOptions: any = []
  public barCodes !: FormGroup;
  editData: any;
  constructor(private _productService: ProductsService, private _formBuilder: FormBuilder, private _barCodeService: BarcodesService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
  spinner = false
  barId: any;
  propId: any;
  barcodeData: any;
  ngOnInit(): void {
    this.barCodes = this._formBuilder.group({
      product: [null],
      barcodeVersion: ['code39_default'],
      barcodeText: ['Customer Reservation ID'],
      date: [new Date()]
    })
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getProduct(this.editData.id)
      this.getBarcode(this.editData.id)
    } else if (this.editData.edit === false) {
      this.getProduct(this._saveService.getPropertyId())
      this.getBarcode(this._saveService.getPropertyId())
    }
  }
  public createBarcode(): void {
    console.log(this.barCodes.value)
    this.spinner = true
    const data = {
      "version": this.barCodes.value.barcodeVersion,
      "text": this.barCodes.value.barcodeText,
      "date": new Date(this.barCodes.value.date).toISOString().split('T')[0],
      "property": this._saveService.getPropertyId(),
      "product": this.barCodes.value.product
    }

    this._barCodeService.createBarCodes(data).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.getBarcode(this._saveService.getPropertyId())
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

  public getBarcode(id: any) {
    this._barCodeService.getBarCodesById(id).subscribe({
      next: (res) => {
        console.log(res, 'bar code response')
        this.barcodeData = res
      },
      error: (error) => {
        this.spinner = false
      }
    })
  }

  public updateBarCode(): void {
    this.spinner = true
    const data = {
      "version": this.barCodes.value.barcodeVersion,
      "text": this.barCodes.value.barcodeText,
      "date": new Date(this.barCodes.value.date).toISOString().split('T')[0],
      "property": this.editData.edit ? this.editData.id : this._saveService.getPropertyId(),
      "product": this.barCodes.value.product,
    }
    const fd = {
      data: data,
      id: this.barId
    }

    this._barCodeService.updateBarCodes(fd).subscribe({
      next: (res) => {
        console.log(res)
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Updated')
        if (this.editData.edit) {
          this.getBarcode(this.editData.id)
        } else {
          this.getBarcode(this._saveService.getPropertyId())
        }
      },
      error: (error) => {
        console.log(error)
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        this.spinner = false
      }
    })
  }

  public openEditModal(data: any) {
    console.log(data, 'data----------------------------')
    this.barId = data.id
    this.barCodes.setValue({
      product: data.product.id,
      barcodeVersion: data.version,
      barcodeText: data.text,
      date: new Date(data.date)
    })
  }

  public deleteBarcodes(id: any) {
    this._barCodeService.deleteBarcodes(id).subscribe({
      next: (res) => {
        this._snackbarService.openSnackbar('✔  Successfully Delted')
        if (this.editData.edit) {
          this.getBarcode(this.editData.id)
        } else {
          this.getBarcode(this._saveService.getPropertyId())
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
