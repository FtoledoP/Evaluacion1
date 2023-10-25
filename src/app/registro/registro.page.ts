import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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


  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut:['', Validators.required],
      carrera: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]})
  }

  registrar() {
    // Obtener los valores de los campos de entrada
    this.nombre = (document.querySelector('#nombre') as HTMLInputElement).value;
    this.apellido = (document.querySelector('#apellido') as HTMLInputElement).value;
    this.rut = (document.querySelector('#rut') as HTMLInputElement).value;
    this.carrera = (document.querySelector('#carrera') as HTMLInputElement).value;
    this.usuario = (document.querySelector('#usuario') as HTMLInputElement).value;
    this.contraseña = (document.querySelector('#contraseña') as HTMLInputElement).value;
    // Crear un objeto de credenciales
    /*const credenciales = {
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      carrera: this.carrera,
      usuario: this.usuario,
      contraseña: this.contraseña,
      selector: this.selector,
    };*/

    // Obtener las credenciales existentes del Local Storage o inicializar un arreglo vacío si no existen
    this.credencialesGuardadas = JSON.parse(localStorage.getItem('credenciales') || '[]');

    console.log(this.credencialesGuardadas);

    // Agregar las nuevas credenciales al arreglo
    this.credencialesGuardadas.push({
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      carrera: this.carrera,
      usuario: this.usuario,
      contraseña: this.contraseña,
    });


    console.log(this.credencialesGuardadas);


    // Guardar el arreglo actualizado en el Local Storage
    localStorage.setItem('credenciales', JSON.stringify(this.credencialesGuardadas));

    // Redirigir a otra página o realizar otras acciones según sea necesario
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
