import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { config } from 'rxjs';
import { AddtowishlistService } from 'src/app/core/services/addtowishlist/addtowishlist.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WishlistService } from 'src/app/core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit, DoCheck {
  @Input() product;
  @Output() sendProduct = new EventEmitter();
  rating: number;

  addedProductsId = [];

  constructor(
    config: NgbRatingConfig,
    private auth: AuthService,
    private wishListservice: WishlistService,
    private addtowishlist: AddtowishlistService
  ) {
    config.max = 5;

    this.addtowishlist
      .getWishList()
      .subscribe(
        (wishlistProducts) => (this.addedProductsId = wishlistProducts)
      );
  }

  ngOnInit(): void {
    this.rating = this.product.rate || 3;
  }
  ngDoCheck() {}
  takeProduct() {
    //this.sendProduct.emit(this.product);
  }

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
}
