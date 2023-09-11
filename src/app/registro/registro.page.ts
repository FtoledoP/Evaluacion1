import { Component } from '@angular/core';

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
  

  constructor() {}

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
}
