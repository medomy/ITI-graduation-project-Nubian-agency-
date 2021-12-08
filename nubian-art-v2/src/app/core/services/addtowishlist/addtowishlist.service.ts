import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddtowishlistService {
  wishlistNIds: Array<any> = [];
  wishlistNproducts: Array<any> = [];
  private wishListproducts = new BehaviorSubject<any>([]);
  private wishListId = new BehaviorSubject<any>([]);
  constructor() {}

  addToWishList(productID, product) {
    this.wishlistNIds.push(productID);
    this.wishlistNproducts.push(product);
    this.wishListproducts.next(this.wishListproducts);
    this.wishListId.next(this.wishlistNIds);
  }
  getWishList() {
    return this.wishListId.asObservable();
  }
  getWishListProduct() {
    return this.wishListproducts.asObservable();
  }
}
