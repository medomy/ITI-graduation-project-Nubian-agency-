import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, onSnapshot, getDocs } from '@angular/fire/firestore';
import { deleteDoc, doc, setDoc } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Icomment } from '../../models/Comment/icomment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firestore: Firestore) { }

    //getAll
    getComments() {
      const dataCollection = collection(this.firestore, 'comments');
      return collectionData(dataCollection);
    }
  
    getOneComment(id) {
      let oneComment = doc(this.firestore, `comments`, id);
      return docData(oneComment);
    }
  
    //add
  
    async addComment(comment: Icomment) {
      const newComment = await doc(collection(this.firestore, 'comments'));
      setDoc(newComment, { ...comment, id: newComment.id });
    }
  
    //update
    async updateComment(id, newprop) {
      await setDoc(doc(this.firestore, 'comments', id), newprop, { merge: true });
    }
  
    //remove
  
    removeComment(id) {
      deleteDoc(doc(this.firestore, 'comments', id));
    }
}

