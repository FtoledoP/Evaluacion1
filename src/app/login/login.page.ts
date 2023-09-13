import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';
  esFormularioValido: boolean = false;
  errorMensaje: string = '';

  constructor(private navCtrl: NavController) {}

  ionViewWillEnter() {
    
    this.restablecerCampos();
  }

  iniciarSesion() {
    this.errorMensaje = ''; 


      this.navCtrl.navigateForward('/home', {
        queryParams: { usuario: this.usuario },
      });
    
  }

  restablecerCampos() {
    this.usuario = ''; 
    this.contrasena = ''; 
    this.esFormularioValido = false; 
    this.errorMensaje = ''; 
  }

}
