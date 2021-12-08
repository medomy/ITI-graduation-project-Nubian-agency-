import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  getDocs,
  getDoc,
  query,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  deleteDoc,
  doc,
  Query,
  setDoc,
  where,
} from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Rate } from '../../models/rate/rate';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  rateList : Array<any>;

  constructor(private firestore: Firestore,private authservice : AuthService) {
    this.getRatings().subscribe((ratings)=>{
      this.rateList = ratings;
    })
   }
  //getAll
  getRatings() {
    const dataCollection = collection(this.firestore, 'ratings');
    return collectionData(dataCollection);
  }

  getOneRating(id) {
    let onerate = doc(this.firestore, `ratings`, id);
    return docData(onerate);
  }

  //add

  async addRating(product: Rate) {
    const newRating = await doc(collection(this.firestore, 'ratings'));
    setDoc(newRating, { ...product, id: newRating.id });
  }

  //update
  async updateRating(id, newprop) {
    await setDoc(doc(this.firestore, 'ratings', id), newprop, { merge: true });
  }
  _addRating(productId,rate) {
    if (this.rateList.length == 0) {

      this.createNewRateItem(productId,rate);
    } else {
      const _item = this.rateList.find((item: any) => item.productId == productId)
      if (_item) {
        this.updateRating(_item.id, { ..._item, TimeStamp: { updatedAt: new Date() } })
      } else {
        this.createNewRateItem(productId,rate);
      }
    }
  }
  async createNewRateItem(productId,rate) {
    const newRateItem = await doc(collection(this.firestore, 'ratings'));
    const _data: Rate = {
      productId: productId,
      userUid: this.user.uid,
      oneRate : rate,
      timeStamp: {
        createdAt: new Date(),
        updatedAt: null,
        removedAt: null,
      },
    };
    setDoc(newRateItem, { ..._data, id: newRateItem.id });
    return newRateItem.id;
  }

  //remove

  removeRating(id) {
    deleteDoc(doc(this.firestore, 'ratings', id));
  }
  getCustomOrderByprdId(idPrd) {
    const data = query(
      collection(this.firestore, 'ratings'),
      where('productId', '==', idPrd) && where('userId', "==" , this.authservice.getuserLocal.uid)
    );
    return collectionData(data);
  }
  get user(){
    return this.authservice.getuserLocal();
  }
}
