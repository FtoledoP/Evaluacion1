import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';


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
              private fb: FormBuilder,
              private spinner: NgxSpinnerService) {
    this.spinner.hide()
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', (Validators.required)],})
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
    }
  };

}
