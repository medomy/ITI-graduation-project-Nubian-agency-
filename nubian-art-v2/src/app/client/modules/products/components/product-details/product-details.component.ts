import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddtowishlistService } from 'src/app/core/services/addtowishlist/addtowishlist.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { WishlistService } from 'src/app/core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  pageID: string;
  product;
  addedProductsId = [];

  constructor(
    private route: ActivatedRoute,
    private ProductsService: ProductsService,
    private addtowishlist: AddtowishlistService,
    private auth: AuthService,
    private wishListservice: WishlistService,
    private cartService: CartService,
    private _route: Router
  ) {
    this.route.params.subscribe((params) => (this.pageID = params.pid));
    this.ProductsService.getOneProduct(this.pageID).subscribe((prodo) => {
      this.product = prodo;
    });

    this.addtowishlist
      .getWishList()
      .subscribe(
        (wishlistProducts) => (this.addedProductsId = wishlistProducts)
      );
  }

  ngOnInit(): void {}

  _AddToWishList(product) {
    /*if (this.auth.isLoggedIn) {
      this.addtowishlist.addToWishList(product.id);
      this.wishListservice
        .getWishListByUid(this.auth.getuserLocal.uid)
        .then((wishList) =>
          this.wishListservice.updateWishlist(wishList.id, {
            productsIds: this.addedProductsId,
          })
        );
    } else {
      alert('Only members allowed to add to their wishlists');
    }*/
    if (this.auth.isLoggedIn) {
      this.wishListservice.addToWishlist(product);
    } else {
      alert('only signedIn users can add to wishlist ');
    }
  }

  async addtocart(productID: any) {
    if (this.user) {
      this.cartService.addToCart(productID);
    } else {
      this._route.navigate(['/auth/login']);
    }
  }

  get user() {
    return this.auth.getuserLocal;
  }
}
