import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { MenuComedogsPage } from '../menu-comedogs/menu-comedogs';
import { User } from '../../interfaces/user.interface';
import { IonicFireProvider } from '../../providers/ionic-fire/ionic-fire';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
 
  user = {} as User;
  usuario:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public menuCtrl: MenuController, 
    public afireDbProv:IonicFireProvider,
    public events: Events
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async irMenuComedog(user:User){
    console.log("Abriendo Menu de Usuario");
    console.log(user);
    try{
      const result = await this.afireDbProv.loginUser(user);
      console.log(result);
      if(result){
        this.navCtrl.setRoot(MenuComedogsPage,{usuario: user});
      }
    }catch (e){
      console.error(e); 
    }
    
  }
  iraRegister(){
    console.log("Abriendo Registro Usuario");
    
    this.navCtrl.push(RegisterPage);
  }

}
