import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiRest } from '../models/apiRest';
import { environment } from 'src/environments/environment';

interface Region{
  id:number;
  nombre:string;
}
interface Comuna{
  id:number;
  nombre:string;
}


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
  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  seleccionComuna:boolean = true;
  usuario: string = '';
  contraseña: string = '';
  credencialesGuardadas: any[] = [];
  registerForm: FormGroup;


  constructor(private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private userService: UserService,
              private router: Router,
              private locationService : LocationService,
              private http:HttpClient) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rut:['', Validators.required],
      carrera: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]})

  }
  async getRegion(){
    return await lastValueFrom(this.http.get<ApiRest<any>>(`${environment.apiUrl}region`))
  }

  async getComuna(idRegion:number){
    return await lastValueFrom(this.http.get<ApiRest<any>>(`${environment.apiUrl}comuna/` + idRegion))
  }

  ngOnInit() {
    this.cargarRegion();
  }
  


  async cargarRegion(){
    const req = await this.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    this.seleccionComuna = false;
    const req = await this.getComuna(this.regionSel);
    this.comunas = req.data;
  }


  registrar() {
    this.spinner.show();
    if (this.registerForm.valid) {
      this.spinner.show();
      const data = this.registerForm.value;
      console.log('Formulario válido:', this.registerForm.value);
      this.userService.register(data.correo, data.password).then((res) => {
        console.log('Usuario registrado correctamente: ' + res);
        this.userService.createUser(data).then((res) => {
          console.log('Usuario creado en la base de datos: ' + res);
          this.spinner.hide();
          this.router.navigate(['/login']);
          this.registerForm.reset();
        }).catch((err) => {
          console.log(err);
          this.spinner
        })
      }).catch((err) => {
        console.log(err);
        this.spinner.hide();
      })
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
