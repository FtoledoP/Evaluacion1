import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


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
              private spinner: NgxSpinnerService,
              private router: Router,
              private userService: UserService) {
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],
      password: ['', (Validators.required)],})
  }



  iniciarSesion() {
   if(this.loginForm.valid) {
     console.log('Formulario válido:', this.loginForm.value);
   }
  }


  validationMessages = {
    correo: {
      required: 'Debe ingresar un correo.'
    },
    password: {
      required: 'Debe ingresar una contraseña.',
    }
  };

}
