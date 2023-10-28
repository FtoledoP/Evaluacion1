import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


import { IonicModule } from '@ionic/angular';

import { RegistrarAsistenciaPageRoutingModule } from './registrar-asistencia-routing.module';

import { RegistrarAsistenciaPage } from './registrar-asistencia.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CoordinatesPipe } from '../pipes/coordinates.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarAsistenciaPageRoutingModule,
    ZXingScannerModule,
    NgxSpinnerModule
  ],
  declarations: [RegistrarAsistenciaPage,
    CoordinatesPipe]
})
export class RegistrarAsistenciaPageModule {}
