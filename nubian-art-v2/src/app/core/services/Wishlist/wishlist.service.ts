import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  getDocs,
  where,
} from '@angular/fire/firestore';
import { deleteDoc, doc, query, setDoc } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Iwishlist } from '../../models/Wishlist/iwishlist';
import { Wishlistitem } from '../../models/Wishlist/wishlistitem';
import { AuthService } from '../auth/auth.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishList: Iwishlist;
  wishListItem: Wishlistitem;
  wishlistItems = [];

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private productServices: ProductsService
  ) {
    // if (this.user.uid) {
    //   this.getWishlistItems().subscribe((data) => {
    //     this.wishlistItems = data;
    //   });
    // }
  }

  //getAll
  /*async getAllWishLists() {
    //let data = collection(this.firestore, "wishList");
    let WishlistItems = [];
    const querySnapshot = await getDocs(collection(this.firestore, 'wishList'));
    querySnapshot.forEach((docu) => {
      WishlistItems.push({ ...docu.data(), id: docu.id });
    });
    return WishlistItems;
    //return collectionData(data);
  }*/
  /*getWishlistItems() {
  let data = collection(this.firestore, "wishList");
  const WishlistItems = [];
  onSnapshot(data, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      WishlistItems.push({ ...doc.data(), id: doc.id })
    });

  });
  return WishlistItems

}*/

  //get by id
  /*getOneWishlistItem(id) {
    let oneWishlistItem = doc(this.firestore, 'wishList', id);
    return docData(oneWishlistItem);
  }*/

  //add

  //creat wishlist
  /*async createWishlist({ data }) {
    this.wishList = {
      userUid: data.uid,
      productsIds: [],
      timestamp: {
        createdAt: new Date().toDateString(),
        removedAt: null,
        updatedAt: null,
      },
    };

    await setDoc(doc(collection(this.firestore, 'wishList')), this.wishList);
  }*/

  /*async addWishlist(Item : Iwishlist){
  //Item = {}
  await setDoc(doc(collection(this.firestore,"wishList")),Item)
}*/
  //update
  /*async updateWishlist(id, newProp) {
    await setDoc(doc(this.firestore, 'wishList', id), newProp, { merge: true });
  }*/
  //remove

  /*removeWishlist(id) {
    deleteDoc(doc(this.firestore, 'wishList', id));
  }*/

  // getting wishlist by uid
  /* async getWishListByUid(UID) {
    let myWishList;
    await this.getAllWishLists().then((wishLists) =>
      wishLists.forEach((wishList) => {
        if (wishList.userUid == UID) {
          myWishList = wishList;
        }
      })
    );
    return myWishList;
  }*/
  get user(): any {
    return this.authService.getuserLocal;
  } //add to cart

  addToWishlist(product) {
    this.createNewWishlistItem(product);
  }
  //get cart item to crunent user
  getWishlistItems() {
    const data = query(
      collection(this.firestore, 'wishList'),
      where('userUid', '==', this.user.uid)
    );
    return collectionData(data);
  }
  // calc grand total price of items in cart

  //create new cart item
  async createNewWishlistItem(producut) {
    let _data: Wishlistitem;
    const newCartItem = await doc(collection(this.firestore, 'wishList'));
    _data = {
      productId: producut.id,
      userUid: this.user.uid,
      timestamp: {
        createdAt: new Date().toDateString(),
        updatedAt: null,
        removedAt: null,
      },
      user: this.user,
      product: producut,
    };
    setDoc(newCartItem, { ..._data, id: newCartItem.id });
    return newCartItem.id;
  }

  //update cart item
  async updateWishlist(id: string, newItem) {
    await setDoc(doc(this.firestore, 'wishList', id), newItem, { merge: true });
  }
  //remove cart item
  removewishlistItem(Id) {
    deleteDoc(doc(this.firestore, 'wishList', Id));
  }

  getProduct(id: any) {
    this.productServices.getOneProduct(id);
  }
}
