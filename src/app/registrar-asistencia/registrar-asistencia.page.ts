import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../services/location.service';
import { Geolocation } from '@capacitor/geolocation';

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
              private spinner: NgxSpinnerService,
              private location: LocationService) {
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
    });
      console.log('Result: ', resultString);
      this.qrResultString = resultString;
      this.scanner.ngOnDestroy();
    }

    cargaInfoUsuario() {
      this.usuariosStorage = JSON.parse(localStorage.getItem('credenciales') || '{}');
      console.log('Carga info usuario', this.usuariosStorage[0].nombre);
    }

    ngOnInit() {
      this.cargaInfoUsuario();
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
