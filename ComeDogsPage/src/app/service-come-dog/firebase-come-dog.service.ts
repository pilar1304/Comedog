import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {ComeDog} from "../interfaces/come-dog";
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class FirebaseComeDogService {

  constructor(public db: AngularFireDatabase, public authdb: AngularFireAuth) { }

  getData(){
    return this.db.list('Comedogs').valueChanges();
  }
  saveData(comedog: ComeDog){
    this.db.database.ref('Comedogs/'+comedog.id).set(comedog);
  }
  updateData(comedog: ComeDog){
    this.db.database.ref('Comedogs/'+comedog.id).set(comedog);
  }
  deleteData(comedog: ComeDog){
    this.db.database.ref('Comedogs/'+comedog.id).remove();
  }
  
  userAuth(user){
    console.log("Envio de login");
    return this.authdb.auth.signInWithEmailAndPassword(user.correo,user.password);
  }

  userAuthClose(){
    console.log(this.authdb.auth.currentUser.email);
    this.authdb.auth.signOut();
  }
}
