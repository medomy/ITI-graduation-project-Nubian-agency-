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
import { Iartist } from '../../models/Artist/iartist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private firestore: Firestore) {}

  //getAll
  getArtists() {
    const dataCollection = collection(this.firestore, 'artist');
    return collectionData(dataCollection);
  }

  //get by id
  getOneArtist(id) {
    let oneArtist = doc(this.firestore, `artist`, id);
    return docData(oneArtist);
  }

  //add

  async addArtist(artist: Iartist) {
    const newArtist = await doc(collection(this.firestore, 'artist'));
    setDoc(newArtist, { ...artist, id: newArtist.id });
  }

  //update
  async updateArtist(id: string, newProp) {
    await setDoc(doc(this.firestore, 'artist', id), newProp, {
      merge: true,
    });
  }

  //remove

  removeArtist(id: string) {
    deleteDoc(doc(this.firestore, 'artist', id));
  }
}
