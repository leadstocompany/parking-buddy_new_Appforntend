import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/service/products.service';
import { SnackbarService } from 'src/app/service/snackbar.service';



@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent {
  @ViewChild('staticBackdrop') modalElement!: ElementRef;
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
  public productType: string = 'Self Uncovered';
  spinner = false
  constructor(
    private _productService: ProductsService,
    private _snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<EditProductsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    this.getData(this.data.id)
  }

  /**
   * Update Products
   */
  public createProduct() {
    const data = {
      type: this.productType,
      property: localStorage.getItem('detailsId')
    }
    this._productService.createProduct(data).subscribe({
      next: (res) => {
        console.log(res)
        localStorage.setItem('productId', res.id)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.modalElement.nativeElement.click();
      },
      error: (error) => {
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        console.log(error)
      }
    })
  }

  public getData(id: string) {
    this._productService.getProductById(id).subscribe({
      next: (res) => {
        console.log(res, 'response')
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
