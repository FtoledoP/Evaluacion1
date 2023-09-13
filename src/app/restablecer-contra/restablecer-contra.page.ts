import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restablecer-contra',
  templateUrl: './restablecer-contra.page.html',
  styleUrls: ['./restablecer-contra.page.scss'],
})
export class RestablecerContraPage implements OnInit {

  usuario!:string;
  password!:string
  usuariosStorage!:any;

  

  constructor() { }

  ngOnInit() {
  }

  resuperarContra(){
    this.cargaInfoUsuario();
    this.password = this.usuariosStorage[0].contraseña;
    console.log(this.password);
  }

  cargaInfoUsuario() {
    this.usuariosStorage = JSON.parse(localStorage.getItem('credenciales') || '{}');
    console.log('Carga info usuario', this.usuariosStorage[0].nombre);
  }

}
