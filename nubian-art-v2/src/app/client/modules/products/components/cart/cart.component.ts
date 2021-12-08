import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  page = 1;
  pageSize = 4;

  //----------------------------------------------
  products: any = [];
  grandTotalPrice: number = 0;
  isLoding: boolean = true;
  isEmpty: boolean;

  constructor(private cartService: CartService) {
    this.cartService.getCartItems().subscribe(async (data) => {
      this.grandTotalPrice = 0;
      this.products = await data;
      await data.forEach((element) => {
        this.grandTotalPrice += element.quantity * element.productData.price;
      });
    });
  }

  ngOnInit(): void {}
  ngOnChanges(): void {}

  decreaseItem(productId: any) {
    this.cartService.decreaseItem(productId);
  }

  addtocart(productId: any) {
    this.cartService.addToCart(productId);
  }

  removeFromCart(productId: any) {
    this.cartService.removeCartItem(productId);
  }
}
