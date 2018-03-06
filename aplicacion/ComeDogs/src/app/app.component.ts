import { Component, ViewChild } from '@angular/core';
import { Platform, Events, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { IonicFireProvider } from '../providers/ionic-fire/ionic-fire';
import { User } from '../interfaces/user.interface';
// import { MenuComedogsPage } from '../pages/menu-comedogs/menu-comedogs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // rootPage:any = MenuComedogsPage;
  @ViewChild(Nav) nav: Nav;
  nombreUser:any = '';
  rootPage:any = LoginPage;

  constructor(public app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events, public afDbAuth: IonicFireProvider) {
    events.subscribe('user:logeado', (user:User) => {
      console.log("Usuario logeado "+ user);
      console.log("Usuario logeado "+ user.name);
      this.nombreUser = user[2];
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  cerrarSesion(){
    this.nav.setRoot(LoginPage);
    this.afDbAuth.loginOutUser();
  }
}

