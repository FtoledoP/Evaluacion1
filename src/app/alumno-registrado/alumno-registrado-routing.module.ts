import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlumnoRegistradoPage } from './alumno-registrado.page';

const routes: Routes = [
  {
    path: '',
    component: AlumnoRegistradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlumnoRegistradoPageRoutingModule {}
