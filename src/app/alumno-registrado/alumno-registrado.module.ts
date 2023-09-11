import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoRegistradoPageRoutingModule } from './alumno-registrado-routing.module';

import { AlumnoRegistradoPage } from './alumno-registrado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoRegistradoPageRoutingModule
  ],
  declarations: [AlumnoRegistradoPage]
})
export class AlumnoRegistradoPageModule {}
