import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalComentsPage } from './modal-coments';

@NgModule({
  declarations: [
    ModalComentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalComentsPage),
  ],
})
export class ModalComentsPageModule {}
