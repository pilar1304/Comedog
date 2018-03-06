import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {FormControl} from "@angular/forms";
import { } from 'googlemaps';
import {ComeDog} from "../interfaces/come-dog";
import {FirebaseComeDogService} from "../service-come-dog/firebase-come-dog.service";

@Component({
  selector: 'app-form-come-dog',
  templateUrl: './form-come-dog.component.html',
  styleUrls: ['./form-come-dog.component.css']
})
export class FormComeDogComponent {

  //variable para saber si esta logeado
  logeado: boolean;
  user: any = {
    correo: '',
    password: ''
  };

  // definir una interfaz comedogs objeto
  comedog = {} as ComeDog;

  // marker por defecto
  lat: number = -0.0885;
  lng: number = -78.4747;
  draggable: boolean = true;
  zoom: number = 14;

  // input de busqueda de sector
  public searchControl: FormControl;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  // auth != null
  // Comedogs
  comedogs: any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public fireservice: FirebaseComeDogService){
    this.logeado = false;
  }

  mapClicked($event) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.zoom = 15;
    // añade latitud y longitud a comedog
    this.comedog.latitud = $event.coords.lat;
    this.comedog.longitud = $event.coords.lng;
  }

  markerDragEnd(m, $event) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.zoom = 15;
    // añade latitud y longitud a comedog
    this.comedog.latitud = $event.coords.lat;
    this.comedog.longitud = $event.coords.lng;
  }

  autocompleteGoogle(){
    //create search FormControl
    this.searchControl = new FormControl();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place resulta
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 15;
          // añade latitud y longitud a comedog
          this.comedog.sector = place.name;
          this.comedog.latitud = place.geometry.location.lat();
          this.comedog.longitud = place.geometry.location.lng();
        });
      });
    });
  }

  async loginUser(user){
    try{
      const result = await this.fireservice.userAuth(user);
      if(result) {
        this.logeado =  true;
        this.autocompleteGoogle();
        this.leerDatos();
      }
    }catch (e){
      console.error(e);
      alert("Usuario no autenticado :(");
    }
  }

  cerrarSesion(){
    this.fireservice.userAuthClose();
    this.logeado = false;
    this.user = {
      correo: '',
      password: ''
    };
  }

  ingresarDatos(comedog: ComeDog) {
    let now = new Date();
    // inicializar variables
    comedog.cantBotellas = 0;
    comedog.cantComida = 20;
    comedog.likes = 0;
    comedog.id = now.getTime().toString();
    console.log(comedog);
    this.fireservice.saveData(comedog);
    this.comedog = {} as ComeDog;
    this.lat = -0.0885;
    this.lng = -78.4747;
  }

  leerDatos(){
    this.fireservice.getData()
      .subscribe((resp)=>{
        this.comedogs = resp;
        console.log(this.comedogs);
      });
  }

  deleteComedog(comedog: ComeDog){
    console.log(comedog);
    this.fireservice.deleteData(comedog);
  }
}
