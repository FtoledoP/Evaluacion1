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

    if (this.validarDatos()) {
      this.navCtrl.navigateForward('/home', {
        queryParams: { usuario: this.usuario },
      });
    } else {
      this.errorMensaje = 'Por favor, corrija los errores en los campos.';
    }
  }

  restablecerCampos() {
    this.usuario = ''; 
    this.contrasena = ''; 
    this.esFormularioValido = false; 
    this.errorMensaje = ''; 
  }

  validarDatos(): boolean {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]*$/;
    const numericRegex = /^[0-9]{4}$/;

    const esUsuarioValido =
      this.usuario.length >= 3 && this.usuario.length <= 8 && alphanumericRegex.test(this.usuario);
    const esContrasenaValida = numericRegex.test(this.contrasena);

    this.esFormularioValido = esUsuarioValido && esContrasenaValida;

    return this.esFormularioValido;
  }

  validarAlfanumerico() {
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]*$/;
    if (!alphanumericRegex.test(this.usuario)) {
      this.errorMensaje = 'El usuario debe ser alfanumérico ';
    } else {
      this.errorMensaje = ''; 
    }
    this.validarDatos(); 
  }

  validarContrasenaNumerica() {
    const numericRegex = /^[0-9]{4}$/;
    if (!numericRegex.test(this.contrasena)) {
      this.errorMensaje = 'La contraseña debe ser numérica y contener 4 dígitos.';
    } else {
      this.errorMensaje = ''; 
    }
    this.validarDatos(); 
  }
}
