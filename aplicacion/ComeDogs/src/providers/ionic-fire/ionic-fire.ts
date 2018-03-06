import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../interfaces/user.interface';

/*
  Generated class for the IonicFireProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IonicFireProvider {

  constructor(public afdb: AngularFireDatabase, public afauth: AngularFireAuth) {
    console.log('Hello IonicFireProvider Provider');
  }

  getData(){
    return this.afdb.list('Comedogs').valueChanges();
  }

  getDatabyUser(user:User){
    return this.afdb.list('Usuarios/'+user.email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')).valueChanges();
  }

  getCommentsById(comedog){
    return this.afdb.list('Comedogs/'+comedog.id+'/comentarios').valueChanges();
  }

  setCommentById(mensaje){
    let now = new Date(); 
    let id= now.getTime().toString(); 
    this.afdb.object('Comedogs/'+mensaje.id+'/comentarios/'+id).set(mensaje);
  }

  updateData(comedog){
    return this.afdb.object('Comedogs/'+comedog.id).update(comedog);
  }

  loginUser(user:User){
    console.log(user);
    return this.afauth.auth.signInWithEmailAndPassword(user.email,user.pass);
  }

  registerUser(user:User){
    this.afauth.auth.signInAnonymously().then(()=>{
      this.afdb.object('Usuarios/'+user.email.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')).set(user);
      return this.afauth.auth.createUserWithEmailAndPassword(user.email,user.pass);
    });
  }

  loginOutUser(){
    this.afauth.auth.signOut();
  }
}
