import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
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
  public products: any = [];
  spinner = false
  editData: any
  constructor(private _productService: ProductsService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
  ngOnInit() {
    this.editData = this._saveService.getSharedData()
    console.log(this._saveService.getPropertyId())
    if (this.editData.edit) {
      this.getProduct(this.editData.edit)
    } else if (this.editData.edit === false) {
      this.getProduct(this._saveService.getPropertyId())
    }
  }

  public createProduct() {
    const data = {
      type: this.productType,
      property: this._saveService.getPropertyId()
    }
    this._productService.createProduct(data).subscribe({
      next: (res) => {
        this._saveService.setProductId(res.id)
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.modalElement.nativeElement.click();
        this.getProduct(this._saveService.getPropertyId())
      },
      error: (error) => {
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        console.log(error)
      }
    })
  }

  public getProduct(id: any) {
    this._productService.getProductById(id).subscribe({
      next: (res) => {
        this.products = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
