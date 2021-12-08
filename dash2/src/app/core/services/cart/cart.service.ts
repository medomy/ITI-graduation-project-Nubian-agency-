import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  getDocs,
  docData,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
} from '@angular/fire/firestore';
// import { deleteDoc, doc, setDoc, updateDoc } from '@firebase/firestore';
import { IProduct } from '../../models/products/i-product';
import { AuthService } from '../auth/auth.service';
import { ICart } from '../../models/cart/i-cart';
import { where } from '@firebase/firestore';
import { ProductsService } from '../products/products.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemList: any = [];
  constructor(private firestore: Firestore,
    private authService: AuthService,
    private productServices: ProductsService
  ) {


    this.getCartItems().subscribe((data) => {
      this.cartItemList = data;

    });
  }
  get user(): any {
    return this.authService.getuserLocal;
  } //add to cart

  addToCart(productId) {
    if (this.cartItemList.length == 0) {

      this.createNewCartItem(productId);
    } else {
      const _item = this.cartItemList.find((item: any) => item.productId == productId)
      if (_item) {
        _item.quantity += 1
        this.updateCart(_item.id, { ..._item, TimeStamp: { updatedAt: new Date() } })


      } else {
        this.createNewCartItem(productId);
      }

    }


  }


  decreaseItem(productId) {
    const _item = this.cartItemList.find((item: any) => item.productId === productId)
    if (_item) {
      _item.quantity -= 1
      this.updateCart(_item.id, { ..._item, TimeStamp: { updatedAt: new Date() } })
      console.log(_item);

    }

  }
  //get cart item to crunent user
  getCartItems() {
    const data = query(collection(this.firestore, 'cart'), where("userId", "==", this.user.uid));
    return collectionData(data)

  }
  // calc grand total price of items in cart
  getGrandTotalPrice() {
    // const _products=this.getProduct(id)
    console.log();
    // let totalPrice = 0;
    // this.cartItemList.map((item: any) => {
    //   totalPrice += item.price;
    // });
    // return totalPrice;
  }
  // getCartItem(id) {
  //   let oneCategory = doc(this.firestore, `category`, id);
  //   return docData(oneCategory);
  // }

  //create new cart item
  async createNewCartItem(productId) {
    const newCartItem = await doc(collection(this.firestore, 'cart'));
    const _data: ICart = {
      quantity: 1,
      productId: productId,
      userId: this.user.uid,
      TimeStamp: {
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    };
    setDoc(newCartItem, { ..._data, id: newCartItem.id });
    return newCartItem.id;
  }

  //update cart item
  async updateCart(id: string, newItem) {
    await setDoc(doc(this.firestore, 'cart', id), newItem, { merge: true });
  }
  //remove cart item
  removeCartItem(id,) {
    deleteDoc(doc(this.firestore, 'cart', id));
  }


  getProduct(id: any) {
    this.productServices.getOneProduct(id)
  }
}
