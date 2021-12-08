import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { IAddress } from '../../models/address/iAddress';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  addressData: IAddress;

  constructor(private db: Firestore) {}

  //create address
  createAddress = async ({ data }) => {
    this.addressData = {
      city: '',
      region: '',
      street: '',
      building: '',
      floor: '',
      flat: '',
      note: '',
      userID: data.uid,
      TimeStamp: {
        createdAt: new Date().toDateString(),
        updatedAt: null,
        removedAt: null,
      },
    };
    await setDoc(doc(collection(this.db, 'addresses')), {
      data: [this.addressData],
    });
  };
  async getAddresses() {
    let Addresses = [];
    const querySnapshot = await getDocs(collection(this.db, 'addresses'));
    querySnapshot.forEach((docu) => {
      Addresses.push({ ...docu.data(), id: docu.id });
    });
    return Addresses;
  }
  async getAddressesByUid(UID) {
    let addresses = [];
    await this.getAddresses().then((wishLists) =>
      wishLists.forEach((wishList) => {
        if (wishList.data[0].userID == UID) {
          addresses.push(wishList);
        }
      })
    );
    return addresses;
  }
  removeAddress(id) {
    deleteDoc(doc(this.db, 'addresses', id));
  }
  //update
  async updateAddresses(id, newprop) {
    await setDoc(doc(this.db, 'addresses', id), newprop, { merge: true });
  }
}
