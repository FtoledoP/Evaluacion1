import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
import { Geolocation } from '@capacitor/geolocation';
import { CoordinatesPipe } from '../pipes/coordinates.pipe';

interface Location {
  latitude: number;
  longitude: number;
}
@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements AfterViewInit {
  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;
  currentUser: any;
  hasDevices: boolean = false;
  qrResultString: string = '';
  qrResult: Result | undefined;
  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;
  hasPermission: boolean = false;
  formats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX
  ];

  usuariosStorage!:any;
  ubi:any;

  constructor(private router:Router,
              private userService: UserService,
              private location: LocationService,
              private pipe: CoordinatesPipe) {
    this.currentUser = this.userService.currentUser;
  }

  ngAfterViewInit(): void {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.currentDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe(() => (this.hasDevices = false));

    this.scanner.scanComplete.subscribe((result: Result) => {
      this.qrResult = result;
      this.qrResultString = result.getText();
    });

    this.scanner.permissionResponse.subscribe((permission: boolean) => {
      this.hasPermission = permission;
    });
  }

  displayCameras(cameras: MediaDeviceInfo[]) {
    console.log('Devices: ', cameras);
    this.availableDevices = cameras;
  }

  handleQrCodeResult(resultString: string) {
    Geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
      const location: Location = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };
      console.log('Latitude: ', location.latitude);
      console.log('Longitude: ', location.longitude);
      this.ubi = location;
      console.log('Result: ', resultString);
      this.qrResultString = resultString;
      this.scanner.ngOnDestroy();
      const ubicacion = this.pipe.transform(this.ubi);
      const data = {
        DatosClase: this.qrResultString,
        Nombre: this.currentUser.nombre,
        Apellido: this.currentUser.apellido,
        Correo: this.currentUser.correo,
        Rut: this.currentUser.rut,
        Carrera: this.currentUser.carrera,
        Region: this.currentUser.region,
        Comuna: this.currentUser.comuna,
        Foto: this.currentUser.selfie,
        Ubicacion: ubicacion
      }
      this.userService.createClass(data).then((res)=>{
        console.log('Clase creado en la base de datos: ---> ' + res);
      });
    });
      console.log('Result: ', resultString);
      this.qrResultString = resultString;
      this.scanner.ngOnDestroy();
    }

  onDeviceSelectChange() {
    console.log('Selection changed: ', this.currentDevice?.label);
    if (this.currentDevice) {
      // Detener el escáner
      this.scanner.ngOnDestroy();
      // Volver a iniciar el escáner con el nuevo dispositivo seleccionado
      setTimeout(() => this.scanner.ngOnInit(), 0);
    }
  }

  retroceder() {
    this.router.navigate(['/home'])
    this.scanner.ngOnDestroy();
  }

}
