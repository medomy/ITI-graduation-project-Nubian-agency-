import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddtowishlistService {
  wishlist : Array<any> = [];
  private wishListproducts = new BehaviorSubject<any>([]);
  constructor() { }

  addToWishList(productID){
    this.wishlist.push(productID);
    this.wishListproducts.next(this.wishlist);
  }
  getWishList(){
    return this.wishListproducts.asObservable();
  }
  removeFromWishList(productId){
    /*this.getWishList().subscribe((products)=>{
      products.forEach((itemID , index)=>{
        if(productId == itemID){
          products.splice(index,1);
        }
      })
      this.wishListproducts.next(products);
    })*/
    /*this.wishlist.forEach((itemID , index)=>{
      if(productId == itemID){
        this.wishlist.splice(index,1);
      }
    })
    console.log("from the service" , productId);
    console.log("from the service" , this.wishlist);
    this.wishListproducts.next(this.wishlist)*/
  }
  

}
