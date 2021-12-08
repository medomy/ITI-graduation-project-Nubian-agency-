import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddressService } from 'src/app/core/services/address/address.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { OrderService } from 'src/app/core/services/Order/order.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { render } from 'creditcardpayments/creditCardPayments';
import { async } from '@firebase/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-order',
  templateUrl: './checkout-order.component.html',
  styleUrls: ['./checkout-order.component.css'],
})
export class CheckoutOrderComponent implements OnInit {
  user: any;
  cartItemsArr: Array<any> = [];
  cartProducts: Array<any> = [];
  _addresses: any = {};
  shipping: number = 30;
  totalPrice: number = this.shipping;
  IsClicked: boolean = false;

  closeResult = '';
  constructor(
    private modalService: NgbModal,
    private authservice: AuthService,
    private cartservice: CartService,
    private productservice: ProductsService,
    private addressservice: AddressService,
    private orderservice: OrderService,
    private router: Router
  ) {
    this.cartservice.getCartItems().subscribe(async (items) => {
      this.user = await authservice.getuserLocal;

      await items.forEach((item) => {
        if (item.userId == this.authservice.getuserLocal.uid) {
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
        .getAddressesByUid(this.authservice.getuserLocal.uid)
        .then((adds) => {
          this._addresses = adds;
        });
      for (let i = 0; i < items.length; i++) {
        this.totalPrice += items[i].quantity * this.cartProducts[i].price;
      }
    });
  }

  ngOnInit(): void {}
  async openPaid(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.orderservice.addOrder({
      userId: this.authservice.getuserLocal.uid,
      adressId: this._addresses.id,
      addressData: this._addresses,
      cartItems: this.cartItemsArr,
      Ispaid: true,
      timeStamp: {
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        removedAt: null,
      },
      totalPrice: this.totalPrice,
    });
    await this.router.navigate(['/home']);
  }
  openUnPaid(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    this.orderservice.addOrder({
      userId: this.authservice.getuserLocal.uid,
      userData: this.authservice.getuserLocal,
      adressId: this._addresses.id,
      addressData: this._addresses,
      cartItems: this.cartItemsArr,
      Ispaid: false,
      timeStamp: {
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        removedAt: null,
      },
      totalPrice: this.totalPrice,
    });
    this.router.navigate(['/home']);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  checkClick() {
    if (this.IsClicked == false) {
      this.IsClicked = true;
    } else {
      this.IsClicked = false;
    }
    render({
      id: '#PaybalArea',
      currency: 'USD',
      value: this.totalPrice.toFixed(2).toString(),
      onApprove: async (details) => {
        console.log(details);
        alert('transaction done');
        this.orderservice.addOrder({
          userId: this.authservice.getuserLocal.uid,
          userData: this.authservice.getuserLocal,
          adressId: this._addresses.id,
          addressData: this._addresses,
          cartItems: this.cartItemsArr,
          Ispaid: true,
          timeStamp: {
            createdAt: new Date().toDateString(),
            updatedAt: null,
            removedAt: new Date().toDateString(),
          },
          totalPrice: this.totalPrice,
        });
        await this.router.navigate(['/home']);
      },
    });
  }
}
