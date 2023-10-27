import { Component } from '@angular/core';
import { AlertController, NavController, createAnimation } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Animation } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private animation: Animation = createAnimation('');
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  seleccionFecha : Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private navCtrl: NavController,
    private animationCtrl: AnimationController,
    private userService: UserService
  ) {
    this.usuario = this.userService.currentUser.nombre + ' ' + this.userService.currentUser.apellido;
  }


  async playAnimation(inputId: string) {
    const inputElement = document.getElementById(inputId);

    if (inputElement) {
      const animation = this.animationCtrl.create()
        .addElement(inputElement)
        .duration(1000)
        .iterations(1)
        .keyframes([
          { offset: 0, transform: 'translateX(0px)' },
          { offset: 0.33, transform: 'translateX(500px)' }, 
          { offset: 0.66, transform: 'translateX(-10px)' }, 
          { offset: 1, transform: 'translateX(0px)' },
        ]);
    await animation.play();
  }
  }

  async mostrarInformacion() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${this.nombre} ${this.apellido}`,
      buttons: ['Yes'],
    });

    await alert.present();
  }

  cerrarSesion() {
    this.userService.logout();
  }

  applyTitleAnimation() {
    const title = document.querySelector('#animacion') as HTMLElement;

    if (title) {
      this.animation = this.animationCtrl
        .create()
        .addElement(title)
        .duration(2500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translateX(0px)', opacity: '1' },
          { offset: 0.4, transform: 'translateX(100%)', opacity: '0' },
          { offset: 0.6, transform: 'translateX(-100%)', opacity: '0' },
          { offset: 1, transform: 'translateX(0px)', opacity: '1' },
        ]); 

      this.animation.play();
    }
  }

  esperarUnSegundo(): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 200); 
    });
}

  ionViewDidEnter() {
    this.applyTitleAnimation();
  }
}