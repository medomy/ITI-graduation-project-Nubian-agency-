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
async getComments() {
  //let data = collection(this.firestore, "comments");
  let Comments = [];
    const querySnapshot = await getDocs(collection(this.firestore, "comments"));
    querySnapshot.forEach((docu)=>{
      Comments.push({...docu.data() , id : docu.id});
    })
    return Comments;
  //return collectionData(data);
}
/*getComments() {
  let data = collection(this.firestore, "comments");
  const Comments = [];
  onSnapshot(data, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      Comments.push({ ...doc.data(), id: doc.id })
    });

  });
  return Comments

}*/

//get by id
getOneComment(id){
  let oneComment = doc(this.firestore,`comments`,id);
  return docData(oneComment);
}

//add

async addComment(Comment : Icomment){
  await setDoc(doc(collection(this.firestore,"comments")),Comment)
}

//update
async updateComment(Comment : Icomment, newProp){
  await setDoc(doc(this.firestore,"comments" , Comment.id),newProp,{merge:true})
}
//remove

removeComment(Comment : Icomment){
  deleteDoc(doc(this.firestore,"comments",Comment.id));
}
}

