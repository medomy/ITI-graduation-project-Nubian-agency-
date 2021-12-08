import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Iorder } from '../../models/Order/iorder';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private firestore: Firestore, private authService: AuthService) {}
  get user(): any {
    return this.authService.getuserLocal;
  }

  //getAll
  async getOrders() {
    //let data = collection(this.firestore, "order");
    let Orders = [];
    const querySnapshot = await getDocs(collection(this.firestore, 'order'));
    querySnapshot.forEach((docu) => {
      Orders.push({ ...docu.data(), id: docu.id });
    });
    return Orders;
    //return collectionData(data);
  }
  /*getOrders() {
  let data = collection(this.firestore, "order");
  const Orders = [];
  onSnapshot(data, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      Orders.push({ ...doc.data(), id: doc.id })
    });

  });
  return Orders

}*/
  getOrdersForUser() {
    const data = query(
      collection(this.firestore, 'order'),
      where('userId', '==', this.user.uid)
    );
    return collectionData(data);
  }

  //get by id
  getOneOrder(id) {
    let oneOrder = doc(this.firestore, 'order', id);
    return docData(oneOrder);
  }

  //add

  async addOrder(order: Iorder) {
    const neworder = await doc(collection(this.firestore, 'order'));
    setDoc(neworder, { ...order, id: neworder.id });
  }
  //update
  async updateOrder(Id, newProp) {
    await setDoc(doc(collection(this.firestore, 'order', Id)), newProp, {
      merge: true,
    });
  }
  //remove

  removeOrder(Id) {
    deleteDoc(doc(this.firestore, 'order', Id));
  }
}
