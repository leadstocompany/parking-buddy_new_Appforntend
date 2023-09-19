import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PricingService } from 'src/app/service/pricing.service';
import { ProductsService } from 'src/app/service/products.service';
import { SnackbarService } from 'src/app/service/snackbar.service';



@Component({
  selector: 'app-edit-pricing',
  templateUrl: './edit-pricing.component.html',
  styleUrls: ['./edit-pricing.component.scss']
})
export class EditPricingComponent {
  addRate!: FormGroup;
  editId: string = ''
  amountIcon = '₹'
  @ViewChild('staticBackdrop') modalElement!: ElementRef;
  public calender_day_price: string = "No";
  spinner: boolean = false
  public parkingOptions: any = []
  public document: any = [];
  pricingId: any

  constructor(
    private _formBuilder: FormBuilder,
    private _pricingService: PricingService,
    private _productService: ProductsService,
    private _snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<EditPricingComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }
  ngOnInit() {
    this.addRate = this._formBuilder.group({
      product: [null],
      date: [null],
      dailyRate: [null],
      hourlyRate: [null],
      code: [null],
      supplyWeeklyRate: [null],
      weeklyRate: [null],
      monthlyRate: [null],
    })
    console.log(this.data.id)
    this.getProduct()
    this.getPricing()
  }

  public submitForm(): void {
    this.spinner = true
    const data = {
      data: {
        "dail_rate": this.addRate.controls['dailyRate'].value,
        "hourly_rate": this.addRate.controls['hourlyRate'].value,
        "weekly_rate": this.addRate.controls['weeklyRate'].value,
        "monthly_rate": this.addRate.controls['monthlyRate'].value,
        "code": this.addRate.controls['code'].value,
        "property": localStorage.getItem('detailsId'),
        "product": localStorage.getItem('productId'),
        "start_date": new Date(this.addRate.controls['date'].value[0]).toISOString().split('T')[0],
        "end_date": new Date(this.addRate.controls['date'].value[1]).toISOString().split('T')[0],
      },
      id: this.pricingId
    }

    this._pricingService.updatePricing(data).subscribe({
      next: (res) => {
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Updated')
        // this.modalElement.nativeElement.click();
      },
      error: (error) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ '+error.error[0])
        console.log(error)
      }
    })
  }


  public openEditModal(data: any): void {
    this.pricingId = data.id
    this.addRate.setValue({
      product: data.product,
      dailyRate: data.dail_rate,
      hourlyRate: data.hourly_rate,
      date: [new Date(data.start_date), new Date(data.end_date)],
      code: data.code,
      supplyWeeklyRate: data.monthly_rate ? true : false,
      weeklyRate: data.weekly_rate,
      monthlyRate: data.monthly_rate,
    });
  }

  // public createRate(): void {
  //   this.addRate.setValue({
  //     product: 'Self Uncovered',
  //     dailyRate: null,
  //     hourlyRate: null,
  //     date: [new Date(), new Date()],
  //     code: null,
  //     supplyWeeklyRate: false,
  //     weeklyRate: null,
  //     monthlyRate: null,
  //   });
  // }

  public getProduct() {
    this._productService.getProductById(this.data.id).subscribe({
      next: (res) => {
        console.log(res, 'get values')
        this.parkingOptions = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public getPricing() {
    this._pricingService.getPricingById(this.data.id).subscribe({
      next: (res) => {
        console.log(res, 'get pricing')
        this.document = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
