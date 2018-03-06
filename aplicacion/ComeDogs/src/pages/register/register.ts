import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/user.interface';
import { IonicFireProvider } from '../../providers/ionic-fire/ionic-fire';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afireDbProv:IonicFireProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async registrarUsuario(user:User){
    let now = new Date(); 
    user.id = now.getTime().toString(); 
    console.log(user);
    this.afireDbProv.registerUser(user);
    this.afireDbProv.loginOutUser();
    this.navCtrl.popToRoot();
  }
}
