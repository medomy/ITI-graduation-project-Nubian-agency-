import { Iuser } from './../../models/user/iuser';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
import { deleteUser } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: Iuser;

  constructor(
    private router: Router,
    private http: HttpClient,
    private db: Firestore
  ) {}

  //create user
  createUser = async ({ data }) => {
    const userData = {
      uid: data.uid,
      email: data.email,
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
      emailVerified: data.emailVerified,
      avatar: data.photoURL,
      birthDate: '',
      gender: '',
      isAdmin: false,
      TimeStamp: {
        createdAt: data.metadata.creationTime,
        lastSignInTime: data.metadata.lastSignInTime,
        updatedAt: '',
        removedAt: '',
      },
    };

    const newUser = await doc(collection(this.db, 'users'));

    setDoc(newUser, { ...userData, id: newUser.id });
  };

  //get by id
  getOneUser(id) {
    const data = query(collection(this.db, 'users'), where('uid', '==', id));
    return collectionData(data);
  }

  // getting all users
  getUsers() {
    const dataCollection = collection(this.db, 'users');
    return collectionData(dataCollection);
  }
  // get all user not admin
  getUserNotAdmin() {
    const data = query(
      collection(this.db, 'users'),
      where('isAdmin', '!=', true)
    );
    return collectionData(data);
  }
  // update users for profile
  async updateUser(id, newprop) {
    await setDoc(doc(this.db, 'users', id), newprop, { merge: true });
  }

  //get user by id from firestore
  async getUsersByuid(id) {
    let oneProduct = doc(this.db, `users`, id);
    return docData(oneProduct);
  }

  removeuser(id) {
    deleteDoc(doc(this.db, 'users', id));
  }
}
