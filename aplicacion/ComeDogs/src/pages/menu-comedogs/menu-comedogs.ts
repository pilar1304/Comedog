import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Events, NavParams } from 'ionic-angular';
import { IonicFireProvider } from '../../providers/ionic-fire/ionic-fire';
import { User } from '../../interfaces/user.interface';

/**
 * Generated class for the MenuComedogsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-comedogs',
  templateUrl: 'menu-comedogs.html'
})
export class MenuComedogsPage {

  homeRoot = 'HomePage'
  searchRoot = 'SearchPage'
  usuario = {} as User;


  constructor(public navCtrl: NavController, public menuCtrl: MenuController,
    public navParams: NavParams, 
    public afireDbProv:IonicFireProvider,
    public events: Events) {
    this.usuario = this.navParams.get('usuario');
    this.getUserInfor(this.usuario);
    this.menuCtrl.enable(true);
    
  }
 
  async getUserInfor(user: User){
    try{
      const result = await this.afireDbProv.loginUser(user);
      if(this.afireDbProv.afauth.app.auth){
        console.log(result);
        if(result){
          this.afireDbProv.getDatabyUser(user) 
          .subscribe((res)=>{
            console.log(res);
            this.events.publish('user:logeado', res);
           });;
          this.navCtrl.setRoot(MenuComedogsPage);
        }
      }
    }catch (e){
      console.error(e); 
    }
  }

  openMenu(){
    console.log("Abrir");
    this.menuCtrl.open();
  }

}
