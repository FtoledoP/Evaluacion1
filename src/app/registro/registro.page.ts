import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  carrera: string = '';
  usuario: string = '';
  contraseña: string = '';
  credencialesGuardadas: any[] = [];
  registerForm: FormGroup;


  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private userService: UserService,
              private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut:['', Validators.required],
      carrera: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]})
  }

  registrar() {
    this.spinner.show();
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      console.log('Formulario válido:', this.registerForm.value);
      this.userService.register(data.correo, data.password).then((res) => {
        console.log('Usuario registrado correctamente: ' + res);
        this.userService.createUser(data).then((res) => {
          console.log('Usuario creado en la base de datos: ' + res);
          this.router.navigate(['/login']);
          this.registerForm.reset();
        }).catch((err) => {
          console.log(err);
          this.spinner.hide();
        })
      }).catch((err) => {
        console.log(err);
        this.spinner.hide();
      })
      this.spinner.hide();
      this.registerForm.reset();
    }
  }
  validationMessages = {
    nombre: {
      required: 'Debe ingresar su nombre.'
    },
    apellido: {
      required: 'Debe ingresar su apellido.'
    },
    rut: {
      required: 'Debe ingresar su rut.'
    },
    carrera: {
      required: 'Debe ingresar su carrera.'
    },
    correo: {
      required: 'Debe ingresar un correo.',
      email: 'Debe ingresar un correo válido.'
    },
    password: {
      required: 'Debe ingresar una contraseña.',
      minlength: 'La contraseña debe tener al menos 6 caracteres.'
    }
  };

}
