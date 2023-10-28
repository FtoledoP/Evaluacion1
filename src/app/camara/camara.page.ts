import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {

  
  imagenes:any[]=[];

  constructor() { }

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
          promptLabelPhoto:"Desde la camara",
          promptLabelPicture:"Desde la galeria"
        }
        );

        if (image.webPath) {
          var blob = (await fetch(image.webPath)).blob();
          this.imagenes.unshift({fname:'foto.'+ image.format,src:image.webPath,file:blob});
        }

        console.log("IMAGENES GUARDADAS ===> ", this.imagenes);
        


    }
  }

  retroceder() {
    window.history.back();
  }
}
