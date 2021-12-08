import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Alert } from 'src/app/core/models/alert/alert';
import { AddtowishlistService } from 'src/app/core/services/addtowishlist/addtowishlist.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CommentService } from 'src/app/core/services/Comment/comment.service';
import { CustomorderService } from 'src/app/core/services/customorder/customorder.service';
import { OrderService } from 'src/app/core/services/Order/order.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { UserService } from 'src/app/core/services/user/user.service';

import { WishlistService } from 'src/app/core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent implements OnInit, DoCheck, OnChanges {
  profileId: string;
  user: DocumentData;
  wishListProductsIds: Array<string> = [];
  wishListProducts: Array<any> = [];
  _wishlistProducts: Array<any> = [];
  wishListId: string;
  addedProductsId: Array<string> = []; // comming from addtowishlist stream
  userData;
  // for orders sec
  orders: Array<any> = [];
  orderItems: Array<any> = [];
  _orderedProducts: Array<any> = [];
  orderedProducts: Array<any> = [];
  orderCounter: number = 0;
  location: string;
  custumOrders: Array<any> = [];

  // for comment sec :-
  title: string;
  body: string;
  hascommented: boolean = false;
  alerts: Alert[] = [
    {
      type: 'info',
      message:
        "We've recieved your feedback and it was a pleasure doing bussiness with you",
    },
  ];

  constructor(
    private router: ActivatedRoute,
    private userServive: UserService,
    private wishlistservice: WishlistService,
    private authService: AuthService,
    private productssrvice: ProductsService,
    private addtowishlistservice: AddtowishlistService,
    private orderservice: OrderService,
    private commentservice: CommentService,
    private customservice: CustomorderService
  ) {
    this.router.params.subscribe(async (param) => {
      this.profileId = param.id;
    });

    this.userData = this.userServive
      .getOneUser(this._user.uid)
      .subscribe(async (data) => {
        this.userData = await data;
        this.location = this.userData[0].location || 'New-York';
      });

    // for wish list items:

    /*this.wishlistservice.getWishListByUid(this.profileId).then((wishlist) => {
      this.wishListId = wishlist.id;
      this.wishListProductsIds = wishlist.productsIds;
      this.wishListProductsIds.forEach((productid) => {
        this.productssrvice
          .getOneProduct(productid)
          .subscribe((product) => this._wishlistProducts.push(product));
      });
    });
    this.wishListProducts = this._wishlistProducts;
    // this to splice from the array set in db every time
    this.addtowishlistservice
      .getWishList()
      .subscribe(
        (wishlistProducts) => (this.addedProductsId = wishlistProducts)
      );*/
    this.orderservice.getOrdersForUser().subscribe((_orders) => {
      this.orders = _orders;
      this.orders.forEach((order) => {
        this.orderCounter += 1;
      });
    });
    /*_orders[_orders.length-1].cartItems.forEach((item) => {
          this.productssrvice
            .getOneProduct(item.productId)
            .subscribe((product) => {
              this._orderedProducts.push(product);
            });
          });
        
      });
    this.orderedProducts = this._orderedProducts
    console.log(this.orderedProducts);*/
    /*this.customservice.getCustomOrderByUserUid(this._user.uid).subscribe((customs)=>{
      customs.forEach((custom)=>{
        let product =custom.productData;
        this.custumOrders.push(product);
      })
    })*/
  }

  ngOnInit(): void {}

  get _user(): any {
    return this.authService.getuserLocal;
  }
  ngDoCheck() {
    //this.wishListProducts = this._wishlistProducts;
    //console.log(this.wishListProductsIds);
    // console.log(this.orders[0].cartItems);
    //console.log(this.orderedProducts);
    // console.log(this.userData);
  }

  ngOnChanges() {}
  /*recieveProduct(product) {
    this.wishListProductsIds.forEach((productId, index) => {
      console.log(productId);
      if (product.id == productId) {
        this.wishListProductsIds.splice(index, 1);
        this.wishListProducts.splice(index,1);
        this.addedProductsId.splice(index,1);
      }
    });
    this.wishlistservice.updateWishlist(this.wishListId, {
      productsIds: this.wishListProductsIds,
    });
    console.log(this.wishListProductsIds);
  }*/

  confirmComment() {
    this.commentservice
      .addComment({
        userId: this._user.uid,
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
        body: this.body,
        title: this.title,
      })
      .then(() => {
        this.hascommented = true;
      });
  }
}
