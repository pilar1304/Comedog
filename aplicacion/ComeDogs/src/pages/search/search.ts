import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicFireProvider } from '../../providers/ionic-fire/ionic-fire';
import {Observable} from 'Rxjs/rx';
import { Subscription } from "rxjs/Subscription";
import { ModalController } from 'ionic-angular';
import { ModalComentsPage } from '../modal-coments/modal-coments';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  comedogs: any;
  comedogsRespaldo: any = [];
  comedogsComents: any = [];

  myLatitud: any;
  myLongitud: any;

  drag: boolean =  false; 

  distancia: any;

  dentro: boolean;

  enBusqueda: boolean;

  observableVar: Subscription;

  direccion:string = '../assets/paw.png';

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private geolocation: Geolocation,
     private afdb: IonicFireProvider,
     public modalCtrl: ModalController,
     public alertCtrl: AlertController ) {
       this.comedogs = [];
    this.dentro = true;
    this.whereIam(); 
    this.distancia = 10;
    this.enBusqueda = true;
  }

  ionViewDidLoad() {
    this.afdb.getData().subscribe((resp) => {
      this.comedogs = resp;
      console.log(this.comedogs);
     }
    );
  }

  getComentariosComedog(comedog){
    console.log(comedog);
    let modal = this.modalCtrl.create(ModalComentsPage, { comedog: comedog });
    
    modal.present();
  }

  getBotellasComedog(comedog){
    console.log(comedog);
    let prompt = this.alertCtrl.create({
      title: 'Cuantas Botellas ?',
      message: "Por favor dinos cuantas botellas vas a depositar en el comedog.",
      inputs: [
        {
          name: 'botellas',
          placeholder: 'ingresa tus botellas',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Put',
          handler: async data => {
            console.log(data);
            console.log('Saved clicked');

            let cant:number = Number(comedog.cantComida);
            let num:number = Number(data.botellas);
            let tot: number =  Number(comedog.cantBotellas);
            comedog.cantComida = (cant - 0.5)
            comedog.cantBotellas = (tot + num);
            try {
              const result = await this.afdb.updateData(comedog);
              if(result){
                prompt.dismiss()
              }
            } catch (error) {
              
            }
          }
        }
      ]
    });
    prompt.present();
  }

  async putLikes(comedog){
    comedog.likes +=1;
    console.log(comedog.likes);
    try {
      const result = await this.afdb.updateData(comedog);
      if(result){
        console.log(result);
      }
    } catch (error) {
      
    }
    
  }

  activarBusqueda(){
    if(this.enBusqueda){
      this.observableVar = Observable.interval(1000).subscribe(()=>{
          this.whereIam();
          this.comedogsRespaldo = [];
          console.log('Buscando...');
          for (let index = 0; index < this.comedogs.length; index++) {
            const element = this.comedogs[index];
            console.log(this.Dist(this.myLatitud,this.myLongitud,element.latitud,element.longitud));
            if(this.Dist(this.myLatitud,this.myLongitud,element.latitud,element.longitud) <= this.distancia ){
              this.comedogsRespaldo.push(element);
              console.log(this.comedogsRespaldo);
            }
          }
      });
      this.enBusqueda = false;
    }else{
      this.enBusqueda = true;
      this.observableVar.unsubscribe();
      console.log("Se para");
    }
    
  }

  whereIam(){
    console.log('Mi posición...');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.myLatitud = resp.coords.latitude;
      this.myLongitud = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  Dist(lat1, lon1, lat2, lon2) {
      let R = 6378.137; //Radio de la tierra en km
      let dLat = this.rad(lat2 - lat1);
      let dLong = this.rad(lon2 - lon1);
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d.toFixed(3);//Retorna tres decimales
  }

  rad(x) {
      return x * Math.PI / 180;
  }

  ionViewDidLeave() {
    this.dentro = false;
  }

}
