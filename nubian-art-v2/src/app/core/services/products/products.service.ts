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
import { IProduct } from '../../models/products/i-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private firestore: Firestore) {}

  //getAll
  getProducts() {
    const dataCollection = collection(this.firestore, 'services');
    return collectionData(dataCollection);
  }

  getOneProduct(id) {
    let oneProduct = doc(this.firestore, `services`, id);
    return docData(oneProduct);
  }

  //add

  async addProduct(product: IProduct) {
    const newProduct = await doc(collection(this.firestore, 'services'));
    setDoc(newProduct, { ...product, id: newProduct.id });
    // await setDoc(newProduct,{product});
    console.log('prodcut add successfully...');
  }

  //update
  async updateProduct(id, newprop) {
    await setDoc(doc(this.firestore, 'services', id), newprop, { merge: true });
  }

  //remove

  removeProduct(id) {
    deleteDoc(doc(this.firestore, 'services', id));
  }
}
