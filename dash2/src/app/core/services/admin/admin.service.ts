import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private db: Firestore) {}
  // get all user not admin
  getAllAdmin() {
    const data = query(
      collection(this.db, 'users'),
      where('isAdmin', '==', true)
    );
    return collectionData(data);
  }
  getAdmin(id) {
    const data = query(
      collection(this.db, 'users'),
      where('isAdmin', '==', true),
      where('uid', '==', id)
    );
    return collectionData(data);
  }
  getAdminByUidAndEmail(uid) {
    const data = query(collection(this.db, 'users'), where('uid', '==', uid));
    return collectionData(data);
  }
}
