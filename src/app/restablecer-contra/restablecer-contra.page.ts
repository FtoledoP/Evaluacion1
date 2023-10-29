import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-restablecer-contra',
  templateUrl: './restablecer-contra.page.html',
  styleUrls: ['./restablecer-contra.page.scss'],
})
export class RestablecerContraPage implements OnInit {

  recForm: FormGroup;
  password:any;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.recForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit() {
  }

  resuperarContra(){
    if(this.recForm.valid){
      this.userService.getUser(this.recForm.value.correo).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          const userTemporal = doc.data();
          this.password = userTemporal['password'];
        });
      });
    }
  }

  retroceder() {
    window.history.back();
  }

  validationMessages = {
    correo: {
      required: 'Debe ingresar un correo.',
      email: 'Debe ingresar un correo válido.'
    }
  };

}
