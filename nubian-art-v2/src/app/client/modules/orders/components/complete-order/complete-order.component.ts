import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/core/services/address/address.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-complete-order',
  templateUrl: './complete-order.component.html',
  styleUrls: ['./complete-order.component.css'],
})
export class CompleteOrderComponent implements OnInit {
  cartItemsArr: Array<any> = [];
  cartProducts: Array<any> = [];
  addresses: Array<any> = [];
  _addresses;
  address: string = '';
  town: string = '';
  city: string = '';
  shipping: number = 30;
  totalPrice = this.shipping;
  phoneNumber: any;

  checkOutForm: FormGroup;
  check;

  constructor(
    private authservice: AuthService,
    private cartservice: CartService,
    private productservice: ProductsService,
    private addressservice: AddressService,
    private fb: FormBuilder,
    private route: Router
  ) {
    this.cartservice.getCartItems().subscribe(async (items) => {
      await items.forEach((item) => {
        if (item.userId == this.user.uid) {
          this.cartItemsArr.push(item);
        }
      });
      await items.forEach((item) => {
        this.productservice
          .getOneProduct(item.productId)
          .subscribe((product) => {
            this.cartProducts.push(product);
          });
      });
      await this.addressservice
        .getAddressesByUid(this.user.uid)
        .then((adds) => {
          this._addresses = adds;
        });
      for (let i = 0; i < items.length; i++) {
        this.totalPrice += items[i].quantity * this.cartProducts[i].price;
      }
    });

    this.addressservice.getAddresses().then((adds) => {
      this.addresses = adds;
    });
    this.phoneNumber = this.user.phoneNumber || "Doesn't exist";
  }

  ngOnInit(): void {
    console.log(this._user);
    this.checkOutForm = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      town: ['', [Validators.required]],
    });
  }
  ngDoCheck() {
    console.log('coming items', this.cartProducts);
    console.log(this.cartItemsArr);
    console.log(this._user);
    console.log('Adresses', this._addresses);
  }
  addAddress() {
    console.log(this.city);
    console.log(this.town);
    console.log(this.address);
    this.addressservice.updateAddresses(this._addresses.id, {
      data: [
        this._addresses.data[0],
        {
          address: this.address,
          city: this.city,
          town: this.town,
          userID: this._addresses.data[0].userID,
        },
      ],
    });
  }
  checkout() {
    this.addAddress();
    this.route.navigate(['orders/complete/checkout']);
  }

  get user() {
    return this.authservice.getuserLocal;
  }
  get _user() {
    return this.authservice.getUser;
  }
}
