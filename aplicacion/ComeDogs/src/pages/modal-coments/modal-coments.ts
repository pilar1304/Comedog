import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { IonicFireProvider } from '../../providers/ionic-fire/ionic-fire';

/**
 * Generated class for the ModalComentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-coments',
  templateUrl: 'modal-coments.html',
})
export class ModalComentsPage {

  comentarios: any;

  comedog:any ;

  mensaje: any = {
    id: "",
    texto: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  public afdb: IonicFireProvider) {
    this.comentarios = [];
    this.comedog =  navParams.get('comedog');
    this.mensaje.id = this.comedog.id;
    console.log('Comedog id', navParams.get('comedog'));
    this.getComentarios(this.comedog);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalComentsPage');
  }

  getComentarios(comedog){
    console.log("trae comentario");
    this.afdb.getCommentsById(comedog).subscribe((resp)=>{
      this.comentarios = resp;
      console.log(this.comentarios);
    });

  }

  async escribirComentario(){
    console.log(this.mensaje);
    try {
      await this.afdb.setCommentById(this.mensaje);
      this.mensaje = {
        id: this.comedog.id,
        texto: ""
      }
    } catch (error) {
      console.log(error);
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


}
