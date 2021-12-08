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
import { Icustomorder } from '../../models/customorder/customorder';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CustomorderService {
  constructor(private firestore: Firestore, private authservice: AuthService) {}

  //getAll
  getCustoms() {
    const dataCollection = collection(this.firestore, 'customService');
    return collectionData(dataCollection);
  }

  //get by id
  getOneCustom(id) {
    let oneCustom = doc(this.firestore, `customService`, id);
    return docData(oneCustom);
  }
  getCustomOrderByprdId(idPrd) {
    const data = query(
      collection(this.firestore, 'customService'),
      where('productId', '==', idPrd),
      where('userId', '==', this.authservice.getuserLocal.uid)
    );
    return collectionData(data);
  }
  getCustomOrderByUserUid(uid) {
    const data = query(
      collection(this.firestore, 'customService'),
      where('userId', '==', uid)
    );
    return collectionData(data);
  }

  //add
  async addCustom(custom: Icustomorder) {
    const newCustom = await doc(collection(this.firestore, 'customService'));
    setDoc(newCustom, { ...custom, id: newCustom.id });
  }
  //update
  async updateCustom(id, newprop) {
    await setDoc(doc(this.firestore, 'customService', id), newprop, {
      merge: true,
    });
  }

  //remove
  removeCustom(id) {
    deleteDoc(doc(this.firestore, 'customService', id));
  }
}
