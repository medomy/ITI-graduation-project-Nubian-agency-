import { Component, DoCheck, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { NgbDateStruct, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { ProductsService } from 'src/app/core/services/products/products.service';
import { AddtowishlistService } from 'src/app/core/services/addtowishlist/addtowishlist.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WishlistService } from 'src/app/core/services/Wishlist/wishlist.service';

import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, DoCheck {
  model: NgbDateStruct;
  value: number = 750;
  options: Options = {
    floor: 100,
    ceil: 10000,
    showSelectionBar: true,
  };
  searchValue: string = '';
  categories = [];
  selectedCategory: string;
  products = [];
  filteredProducts = [];
  addedToWishlistProductIds = [];
  constructor(
    config: NgbRatingConfig,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private addtowishlistservice: AddtowishlistService,
    private auth: AuthService,
    private wishlistservice: WishlistService
  ) {
    config.max = 5;
    this.categoriesService.getcategoriess().subscribe((data) => {
      this.categories = data;
    });
    this.productService
      .getProducts()
      .subscribe((incomingProducts) => (this.products = incomingProducts));

    // then((incomingProducts) => (this.products = incomingProducts));
    this.filteredProducts = this.products;
    console.log(this.products);
    this.addtowishlistservice.getWishList().subscribe((productsIds) => {
      this.addedToWishlistProductIds = productsIds;
    });
  }

  ngOnInit(): void {
    /*if(!this.selectedCategory && this.searchValue == ""){
      this.filteredProducts = this.products;
    }
    else if(this.selectedCategory && this.searchValue == ""){
      this.filteredProducts = this.products.filter((product)=> product.categoryID == this.selectedCategory);
    }*/
  }
  ngDoCheck() {
    if (
      !this.selectedCategory &&
      (this.searchValue == '' || this.searchValue)
    ) {
      this.filteredProducts = this.products.filter(
        (product) => product.price <= this.value
      );
    } else if (
      this.selectedCategory &&
      (this.searchValue == '' || this.searchValue)
    ) {
      this.filteredProducts = this.products.filter(
        (product) =>
          product.categoryID == this.selectedCategory &&
          product.price <= this.value
      );
    }
    /*else{
      this.filteredProducts = this.products;
      console.log(this.filteredProducts);
    }*/
  }

  searchForProduct() {
    console.log(this.searchValue);
    console.log(this.selectedCategory);
  }
  recieveProduct(product) {
    /*if (this.auth.isLoggedIn) {
      this.addtowishlistservice.addToWishList(product.id);
      this.wishlistservice
        .getWishListByUid(this.auth.getuserLocal.uid)
        .then((wishList) =>
          this.wishlistservice.updateWishlist(wishList.id, {
            productsIds: this.addedToWishlistProductIds,
          })
        );
    } else {
      alert('Only members allowed to add to their wishlists');
    }*/
  }
}
