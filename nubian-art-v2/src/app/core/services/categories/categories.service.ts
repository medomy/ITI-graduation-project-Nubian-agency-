import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
} from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Category } from '../../models/category/category';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: Firestore) {
    this.getcategoriess();
  }

  //getAll
  getcategoriess() {
    const dataCollection = collection(this.firestore, 'category');
    return collectionData(dataCollection);
  }

  //get by id
  // returns an observable (must subscribe after)
  getOneCategory(id) {
    let oneCategory = doc(this.firestore, `category`, id);
    return docData(oneCategory);
  }

  //add categeory
  async addCategory(category: Category) {
    const newCat = await doc(collection(this.firestore, 'category'));
    setDoc(newCat, { ...category, id: newCat.id });
  }

  //update (newcat is the added property in an object)
  async updateCategory(id: string, newcat) {
    await setDoc(doc(this.firestore, 'category', id), newcat, { merge: true });
  }
  //remove

  removeCategory(id) {
    deleteDoc(doc(this.firestore, 'category', id));
  }
}
