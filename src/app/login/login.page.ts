import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  loginForm: FormGroup;

  constructor(private navCtrl: NavController,
              private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', (Validators.required, Validators.minLength(6))],})
  }

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

  validationMessages = {
    usuario: {
      required: 'Debe ingresar un nombre de usuario.'
    },
    password: {
      required: 'Debe ingresar una contraseña.',
      minlength: 'La contraseña debe tener al menos 6 caracteres.'
    }
  };

}
