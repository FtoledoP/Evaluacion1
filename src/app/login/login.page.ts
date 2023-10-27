import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { query } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  contrasena: string = '';
  esFormularioValido: boolean = false;
  error:boolean = false
  errorMensaje:string = 'Correo o contraseña incorrectos.'
  loginForm: FormGroup;

  constructor(private navCtrl: NavController,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private router: Router,
              private userService: UserService) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],})
  }



  iniciarSesion() {
    if(this.loginForm.valid) {
      this.error = false;
      this.spinner.show();
      this.userService.login(this.loginForm.value.correo, this.loginForm.value.password).then((userCredential) => {
        this.error = false;
        this.userService.getUser(this.loginForm.value.correo).then((querySnapshot) => {
          this.error = false;
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            this.userService.currentUser = doc.data();
            this.spinner.hide();
            this.router.navigate(['/home']);
          });
          this.loginForm.reset();
        }).catch((error) => {
          this.spinner.hide();
          this.error = true;
          console.log(error);
          this.loginForm.reset();
        });
        this.loginForm.reset();
      }).catch((error) => {
        this.spinner.hide();
        this.error = true;
        console.log(error);
        this.loginForm.reset();
      });
    }
  }


  validationMessages = {
    correo: {
      required: 'Debe ingresar un correo.',
      email: 'Debe ingresar un correo válido.'
    },
    password: {
      required: 'Debe ingresar una contraseña.',
    }
  };

}
