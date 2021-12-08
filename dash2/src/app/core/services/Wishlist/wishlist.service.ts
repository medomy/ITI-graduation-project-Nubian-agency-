import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  getDocs,
} from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Iwishlist } from '../../models/Wishlist/iwishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  wishList: Iwishlist;

  constructor(private firestore: Firestore) {}

  //getAll
  async getAllWishLists() {
    //let data = collection(this.firestore, "wishList");
    let WishlistItems = [];
    const querySnapshot = await getDocs(collection(this.firestore, 'wishList'));
    querySnapshot.forEach((docu) => {
      WishlistItems.push({ ...docu.data(), id: docu.id });
    });
    return WishlistItems;
    //return collectionData(data);
  }
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
  getOneWishlistItem(id) {
    let oneWishlistItem = doc(this.firestore, 'wishList', id);
    return docData(oneWishlistItem);
  }

  //add

  //creat wishlist
  async createWishlist({ data }) {
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
  }

  /*async addWishlist(Item : Iwishlist){
  //Item = {}
  await setDoc(doc(collection(this.firestore,"wishList")),Item)
}*/
  //update
  async updateWishlist(id, newProp) {
    await setDoc(doc(this.firestore, 'wishList', id), newProp, { merge: true });
  }
  //remove

  removeWishlist(id) {
    deleteDoc(doc(this.firestore, 'wishList', id));
  }

  // getting wishlist by uid
  async getWishListByUid(UID) {
    let myWishList;
    await this.getAllWishLists().then((wishLists) =>
      wishLists.forEach((wishList) => {
        if (wishList.userUid == UID) {
          myWishList = wishList;
        }
      })
    );
    return myWishList;
  }
}
