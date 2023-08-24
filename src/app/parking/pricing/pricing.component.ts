import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PricingService } from 'src/app/service/pricing.service';
import { ProductsService } from 'src/app/service/products.service';
import { SaveidService } from 'src/app/service/saveID/saveid.service';
import { SnackbarService } from 'src/app/service/snackbar.service';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent {
  addRate!: FormGroup;
  editId: string = ''
  amountIcon = '₹'
  @ViewChild('staticBackdrop') modalElement!: ElementRef;
  public calender_day_price: string = "No";
  spinner: boolean = false
  public parkingOptions: any = []
  public document: any = [];
  editData: any;
  pricingId: any;
  productId: any;
  constructor(private _formBuilder: FormBuilder, private _pricingService: PricingService, private _productService: ProductsService, private _snackbarService: SnackbarService, private _saveService: SaveidService) { }
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
    
    this.editData = this._saveService.getSharedData()
    if (this.editData.edit) {
      this.getProduct(this.editData.id)
      this.getPricing(this.editData.id)
    } else if (this.editData.edit === false) {
      this.getProduct(this._saveService.getPropertyId())
      this.getPricing(this._saveService.getPropertyId())
    }
  }
  public submitForm(): void {
    this.spinner = true
    let data = {
      "dail_rate": this.addRate.controls['dailyRate'].value,
      "hourly_rate": this.addRate.controls['hourlyRate'].value,
      "weekly_rate": this.addRate.controls['weeklyRate'].value,
      "monthly_rate": this.addRate.controls['monthlyRate'].value,
      "code": this.addRate.controls['code'].value,
      "property": this._saveService.getPropertyId(),
      "product": this._saveService.getProductId(),
      "start_date": new Date(this.addRate.controls['date'].value[0]).toISOString().split('T')[0],
      "end_date": new Date(this.addRate.controls['date'].value[1]).toISOString().split('T')[0],
    }
    this._pricingService.createPricing(data).subscribe({
      next: (res) => {
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Submitted')
        this.modalElement.nativeElement.click();
        this.getPricing(this._saveService.getPropertyId())
      },
      error: (error) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        console.log(error)
      }
    })
  }

  public editPricing(): void {
    let data: any;
    if (this.editData.edit) {
      data = {
        "dail_rate": this.addRate.controls['dailyRate'].value,
        "hourly_rate": this.addRate.controls['hourlyRate'].value,
        "weekly_rate": this.addRate.controls['weeklyRate'].value,
        "monthly_rate": this.addRate.controls['monthlyRate'].value,
        "code": this.addRate.controls['code'].value,
        "property": this.editData.id,
        "product": this.productId,
        "start_date": new Date(this.addRate.controls['date'].value[0]).toISOString().split('T')[0],
        "end_date": new Date(this.addRate.controls['date'].value[1]).toISOString().split('T')[0],
      }

    } else {
      data = {
        "dail_rate": this.addRate.controls['dailyRate'].value,
        "hourly_rate": this.addRate.controls['hourlyRate'].value,
        "weekly_rate": this.addRate.controls['weeklyRate'].value,
        "monthly_rate": this.addRate.controls['monthlyRate'].value,
        "code": this.addRate.controls['code'].value,
        "property": this._saveService.getPropertyId(),
        "product": this._saveService.getProductId(),
        "start_date": new Date(this.addRate.controls['date'].value[0]).toISOString().split('T')[0],
        "end_date": new Date(this.addRate.controls['date'].value[1]).toISOString().split('T')[0],
      }
    }

    const fd = {
      data: data,
      id: this.pricingId
    }

    this._pricingService.updatePricing(fd).subscribe({
      next: (res) => {
        this.spinner = false
        this._snackbarService.openSnackbar('✔ Form Successfully Updated')
        // this.modalElement.nativeElement.click();
        if (this.editData.edit) {
          this.getPricing(this.editData.id)
        } else {
          this.getPricing(this._saveService.getPropertyId())
        }

      },
      error: (error) => {
        this.spinner = false
        this._snackbarService.openSnackbar('❌ Internal Server Error')
        console.log(error)
      }
    })

  }
  public openEditModal(data: any): void {
    this.pricingId = data.id
    this.productId = data.product.id;
    this.addRate.setValue({
      product: data.product.type,
      dailyRate: data.dail_rate,
      hourlyRate: data.hourly_rate,
      date: [new Date(data.start_date), new Date(data.end_date)],
      code: data.code,
      supplyWeeklyRate: data.monthly_rate ? true : false,
      weeklyRate: data.weekly_rate,
      monthlyRate: data.monthly_rate,
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

  public getProduct(id: any) {
    this._productService.getProductById(id).subscribe({
      next: (res) => {
        console.log(res, 'get values')

        this.parkingOptions = res
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  public getPricing(id: any) {
    this._pricingService.getPricingById(id).subscribe({
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
