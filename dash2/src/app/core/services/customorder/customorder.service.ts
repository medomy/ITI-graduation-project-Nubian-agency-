import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  getDocs,
  getDoc,
} from '@angular/fire/firestore';
import {
  CollectionReference,
  deleteDoc,
  doc,
  Query,
  setDoc,
} from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Icustomorder } from '../../models/customorder/customorder';

@Injectable({
  providedIn: 'root',
})
export class CustomorderService {
  constructor(private firestore: Firestore) {}

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
