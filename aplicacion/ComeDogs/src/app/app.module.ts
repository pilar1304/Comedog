import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IonicFireProvider } from '../providers/ionic-fire/ionic-fire';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { SearchPageModule } from '../pages/search/search.module';

import { MenuComedogsPage } from '../pages/menu-comedogs/menu-comedogs';
import { HomePageModule } from '../pages/home/home.module';
import { LoginPage } from '../pages/login/login'; 
import { RegisterPage } from '../pages/register/register';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ModalComentsPageModule } from '../pages/modal-coments/modal-coments.module';


export const firebaseConfig =  {
  //apiKey: "AIzaSyCrgG7pOWMbLgR5xFR3oEjkrP6PBN4WyiY",
  //authDomain: "redken-5691f.firebaseapp.com",
  //databaseURL: "https://redken-5691f.firebaseio.com",
  //storageBucket: "redken-5691f.appspot.com",
  //messagingSenderId: "252808305563",
    apiKey: "AIzaSyAGzGA1ckiTsyJeRDBtxIy_1SBZD6w5pX4",
    authDomain: "proyectofinal-cd866.firebaseapp.com",
    databaseURL: "https://proyectofinal-cd866.firebaseio.com",
    storageBucket: "proyectofinal-cd866.appspot.com",
    messagingSenderId: "1071004091960"
}

@NgModule({
  declarations: [
    MyApp,
    MenuComedogsPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SearchPageModule,
    HomePageModule,
    ModalComentsPageModule 
  ], 
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MenuComedogsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    IonicFireProvider,
    Geolocation,
    GoogleMaps
  ]
})
export class AppModule {}
