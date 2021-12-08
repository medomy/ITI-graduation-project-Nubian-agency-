import {
  AfterViewInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CustomorderService } from 'src/app/core/services/customorder/customorder.service';
import { OrderService } from 'src/app/core/services/Order/order.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { RateService } from 'src/app/core/services/rate/rate.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { WishlistService } from 'src/app/core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-order-wishlist',
  templateUrl: './order-wishlist.component.html',
  styleUrls: ['./order-wishlist.component.css'],
})
export class OrderWishlistComponent
  implements OnInit, OnChanges, DoCheck, AfterViewInit
{
  //@Input() wishListProducts;
  //@Input() orderedProducts:Array<any>;
  //@Input() custumOrders;
  @Output() sendProduct = new EventEmitter();
  wishListProducts: Array<any> = [];
  orderedProducts: Array<any> = [];
  custumOrders: Array<any>;
  rating: number = 1;
  ratingArr: Array<number> = [];
  testArr: Array<number> = [];
  _user: any;
  testRate: number;
  ratedProducts: Array<any> = [];
  myRate: Array<number> = [];

  wishListProductsIds: Array<string> = [];

  _wishlistProducts: Array<any> = [];
  orders: Array<any>;
  avgRate: number = 0;

  userRatings: Array<any> = [];
  orderDataC;
  orderCounter: number = 0;
  constructor(
    config: NgbRatingConfig,
    private authservice: AuthService,
    private userservice: UserService,
    private productservice: ProductsService,
    private rateservice: RateService,
    private customservice: CustomorderService,
    private wishlistservice: WishlistService,
    private productssrvice: ProductsService,
    private orderservice: OrderService,
    private cartService: CartService
  ) {
    config.max = 5;
    /*this.rateservice.getRatings().subscribe((ratings)=>{
      ratings.forEach((rating)=>{
        if(rating.userUid == this.user.uid){
          this.userRatings.push(rating);
        }
      })
    })*/
    this.wishlistservice.getWishlistItems().subscribe((items) => {
      console.log(items);
      items.forEach((item) => {
        this.wishListProducts.push(item);
      });
    });
    this.orderservice.getOrdersForUser().subscribe((orders) => {
      orders.forEach((order) => {
        order.cartItems.forEach((item) => {
          console.log('sds', item.productData);
          this.orderedProducts.push(item.productData);
        });
      });
    });
    this.customservice
      .getCustomOrderByUserUid(this.user.uid)
      .subscribe((customs) => {
        customs.forEach((custom) => {
          let product = custom.productData;
          this.custumOrders.push(product);
        });
      });
  }
  ngOnChanges(): void {}
  ngAfterViewInit() {
    /*this.orderedProducts.forEach((product)=>{
      console.log("foreach");
      this.rateservice.getCustomOrderByprdId(product.id).subscribe((rateArr)=>{
        console.log("rateArr",rateArr);
        //this.myRate.push(rateArr[0].oneRate);
      })
    })*/
    //console.log("from after view");
    //console.log(this.orderedProducts);
  }

  ngOnInit(): void {
    //this.ratingArr.length = this.orderedProducts.length
  }

  ngDoCheck() {
    //console.log(this._user);
    //console.log(this.ratingArr);
    //console.log(this.ratedProducts);
    console.log(this.orderedProducts);
  }

  /*rateProduct(productID,index){
    let numOfUsers = 0;
    let totalRate = 0;
    let avgRate = 0;
    console.log("rating arr",this.ratingArr);
    console.log("ordered arr",this.orderedProducts);
     this.rateservice.addRating({
      userUid : this.user.uid,
      productId : productID,
      oneRate : this.ratingArr[index],
      timeStamp : {
        createdAt : new Date(),
        updatedAt : null,
        removedAt : null
      }
    }).then(()=>{
      this.rateservice.getRatings().subscribe(async (ratings)=>{
        console.log(ratings);
        ratings.forEach(async (rating)=>{
          if(rating.productId == productID ){
            console.log("from rating loop");
            numOfUsers += 1;
            totalRate += rating.oneRate
          }
        })
        avgRate = Math.round((totalRate/numOfUsers));
        console.log(numOfUsers , totalRate,avgRate);
        console.log(this.orderedProducts);
        console.log(productID);
      })
    })
    //this.productservice.updateProduct(productID,{rate : avgRate })
    //this.setRate(productID,avgRate);
    /*this.orderedProducts.forEach((product)=>{
      if(product.id == productID){
        this.productservice.updateProduct(productID,{rate : avgRate })
      }
    })
    this.avgRate = avgRate;
    console.log(this.avgRate);

  }*/
  /*setRate(productID){
    console.log(productID)
    this.productservice.updateProduct(productID,{rate : this.avgRate })
  }
  confirmRates(){
    console.log(this.ratingArr);
    console.log(this.userRatings);
  }*/
  get user() {
    return this.authservice.getuserLocal;
  }

  remove(_product, index) {
    console.log(_product);
    this.wishlistservice.removewishlistItem(_product);
    this.wishListProducts.splice(index, 1);
  }
  async addtocart(productID: any) {
    this.cartService.addToCart(productID);
  }
}
