import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import {FormComeDogComponent} from "./form-come-dog/form-come-dog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {FirebaseComeDogService} from "./service-come-dog/firebase-come-dog.service";

@NgModule({
  declarations: [
    AppComponent,
    FormComeDogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCrgG7pOWMbLgR5xFR3oEjkrP6PBN4WyiY",
      libraries: ["places"]
    }),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [FirebaseComeDogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
