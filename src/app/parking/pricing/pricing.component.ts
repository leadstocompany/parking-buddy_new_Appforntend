import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PricingService } from 'src/app/service/pricing.service';
import { ProductsService } from 'src/app/service/products.service';
import { SnackbarService } from 'src/app/service/snackbar.service';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  addRate!: FormGroup;
  editId: string = ''
  @ViewChild('staticBackdrop') modalElement!: ElementRef;
  public calender_day_price: string = "No";
  spinner: boolean = false
  public parkingOptions: any = []
  public document: any = [];
  constructor(private _formBuilder: FormBuilder, private _pricingService: PricingService, private _productService: ProductsService, private _snackbarService: SnackbarService) { }
  ngOnInit() {
    this.addRate = this._formBuilder.group({
      product: ['Self Uncovered'],
      date: [],
      dailyRate: [null],
      hourlyRate: [null],
      code: [null],
      supplyWeeklyRate: [null],
      weeklyRate: [null],
      monthlyRate: [null],
    })
    this.getProduct()
    this.getPricing()
  }

  public submitForm(): void {
    this.spinner = true
    // console.log(this.calender_day_price)
    // console.log(this.addRate.value)
    // const formData = new FormData();
    // formData.append('', this.addRate.controls['product'].value)
    // formData.append('', this.addRate.controls['date'].value)
    // formData.append('', this.addRate.controls['dailyRate'].value)
    // formData.append('', this.addRate.controls['hourlyRate'].value)
    // formData.append('', this.addRate.controls['code'].value)
    // formData.append('', this.addRate.controls['supplyWeeklyRate'].value)
    // formData.append('', this.addRate.controls['weeklyRate'].value)
    // formData.append('', thisS.addRate.controls['monthlyRate'].value)
    const data = {
      "dail_rate": this.addRate.controls['dailyRate'].value,
      "hourly_rate": this.addRate.controls['hourlyRate'].value,
      "weekly_rate": this.addRate.controls['weeklyRate'].value,
      "monthly_rate": this.addRate.controls['monthlyRate'].value,
      "code": this.addRate.controls['code'].value,
      "property": localStorage.getItem('detailsId'),
      "product": localStorage.getItem('productId'),
      "start_date": new Date(this.addRate.controls['date'].value[0]).toISOString().split('T')[0],
      "end_date": new Date(this.addRate.controls['date'].value[1]).toISOString().split('T')[0],
    }

    this._pricingService.createPricing(data).subscribe({
      next: (res) => {
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.modalElement.nativeElement.click();
        this.getPricing()
      },
      error: (error) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        console.log(error)
      }
    })
  }

  public editPricing(): void {
    const formData = new FormData();
    formData.append('', this.addRate.controls['product'].value)
    formData.append('', this.addRate.controls['date'].value)
    formData.append('', this.addRate.controls['dailyRate'].value)
    formData.append('', this.addRate.controls['hourlyRate'].value)
    formData.append('', this.addRate.controls['code'].value)
    formData.append('', this.addRate.controls['supplyWeeklyRate'].value)
    formData.append('', this.addRate.controls['weeklyRate'].value)
    formData.append('', this.addRate.controls['monthlyRate'].value)
    const data = {
      data: formData,
      _id: this.editId
    }
    this._pricingService.editPricing(data).subscribe({
      next: (res) => {
        console.log(res)
        this.modalElement.nativeElement.click();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public openEditModal(data: any): void {
    this.editId = data._id
    this.addRate.setValue({
      product: data?.product,
      dailyRate: 100,
      hourlyRate: 20,
      date: data.date,
      code: 42,
      supplyWeeklyRate: false,
      weeklyRate: null,
      monthlyRate: null,
    });
  }

  public createRate(): void {
    this.addRate.setValue({
      product: 'Self Uncovered',
      dailyRate: null,
      hourlyRate: null,
      date: [new Date(), new Date()],
      code: null,
      supplyWeeklyRate: false,
      weeklyRate: null,
      monthlyRate: null,
    });
  }

  public getProduct() {
    this._productService.getProductById(localStorage.getItem('detailsId')).subscribe({
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
    this._pricingService.getPricingById(localStorage.getItem('detailsId')).subscribe({
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
