import { Injectable } from "@angular/core";
import { collectionData, Firestore } from "@angular/fire/firestore";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Observable } from "rxjs";

export interface Task {
    id?,
    text,
    date,
    checked
}


@Injectable({
    providedIn:'root'
})
export class DataService{
    constructor (private firestore: Firestore){}
  
   async updateTask(task){
    return updateDoc(doc(this.firestore, `notes/${task.id}`), {...task})    
    // return collection (collection(this.firestore, 'notes'),{'id':task.id}).
    }
    async deleteTask(taskId){
    return await deleteDoc (doc(this.firestore, `notes/${taskId}`)).then((v) => console.log(`done delete ${taskId}`))
   }
   async addTask(task: Task){
    return addDoc(collection(this.firestore, 'notes'), task)
   }
    getAllTasks() : Observable<Task[]>{
        const noteRef = collection(this.firestore, 'notes');
        return collectionData(noteRef, {idField: 'id'}) as Observable <Task[]>;
      }
}