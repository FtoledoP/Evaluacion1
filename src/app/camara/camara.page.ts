import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {


  imagen:any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    defineCustomElements(window);
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
          var blob = (await fetch(image.webPath)).blob();
          this.imagen = {fname:'foto.'+ image.format,src:image.webPath,file:blob};
          /*
          this.userService.subirSelfie(this.imagen).then((res)=>{
            console.log("IMAGEN GUARDADA ===> ", res);
          }).catch((err)=>{
            console.log("ERROR AL GUARDAR IMAGEN ===> ", err);
          });
          */
        }

        console.log("IMAGEN GUARDADA ===> ", this.imagen);



    }
  }

  retroceder() {
    window.history.back();
  }
}
