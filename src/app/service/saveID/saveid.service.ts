import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})

export class SaveidService {
  private cookieKey = 'editVal'
  private property = 'detailsId';
  private product = 'productId';
  constructor(private _cookieService: CookieService) { }

  setSharedData(data: { id: string, edit: boolean }) {
    this.deleteSaveCookie()
    this._cookieService.set(this.cookieKey, JSON.stringify(data))
  }
  getSharedData() {
    return JSON.parse(this._cookieService.get(this.cookieKey))
  }

  setProductId(id: string) {
    this._cookieService.set(this.product, id)
  }
  getProductId() {
    return this._cookieService.get(this.product)
  }

  setPropertyId(id: string) {
    this._cookieService.set(this.property, id)
  }
  getPropertyId() {
    return this._cookieService.get(this.property)
  }

  deleteSaveCookie() {
    this._cookieService.delete(this.cookieKey);
    this._cookieService.delete(this.property);
    this._cookieService.delete(this.product);
  }

}
