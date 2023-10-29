import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {


  imagen:any;

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    defineCustomElements(window);
    this.spinner.hide();
  }

  async takePhoto(){

    var cSourse = CameraSource.Prompt;

    if ((await Camera.checkPermissions()).camera == 'granted') {
      const image = await Camera.getPhoto(
        {
          resultType:CameraResultType.Uri,
          quality:100,
          height:1024,
          width:1024,
          source:cSourse,
          presentationStyle:'popover',
          promptLabelCancel:"Cancelar",
          promptLabelHeader:"Seleccione",
          promptLabelPhoto:"Desde la galeria",
          promptLabelPicture:"Desde la camara"
        }
        );

        if (image.webPath) {
          const pngBlob = await fetch(image.webPath).then((response) =>
          response.blob()
          );
          this.imagen = {
            fname:
              this.userService.currentUser.nombre +
              this.userService.currentUser.apellido +
              '.png',
            src: image.webPath,
            file: pngBlob,
          };
          console.log('IMAGEN GUARDADA ===> ', this.imagen);
        }

        console.log("IMAGEN GUARDADA ===> ", this.imagen);



    }
  }

  subirFoto(){
    this.spinner.show();
    this.userService.subirSelfie(this.imagen);
    this.spinner.hide();
  }

  retroceder() {
    window.history.back();
  }
}
