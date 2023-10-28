import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements AfterViewInit {
  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;
  nombre!:string
  apellido!:string
  rut!:string
  datoUsuario = {
    nombre: '',
    apellido: '',
    rut: '',
    escuela: '',
    carrera: '',
    contraseña: '',
    usuario: ''
  };

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

  constructor(private router:Router) {}

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
    const usuarioActualString = localStorage.getItem('credenciales');

    if (usuarioActualString) {
      this.datoUsuario = JSON.parse(usuarioActualString);
      console.log(usuarioActualString);
      console.log(this.datoUsuario)
    }
    this.datosUsuario();
    console.log('Result: ', resultString);
    console.log(this.datoUsuario);
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

  datosUsuario() {

    this.nombre = this.datoUsuario.nombre;
    this.apellido = this.datoUsuario.apellido;
    this.rut = this.datoUsuario.rut;
    
  }

  retroceder() {
    this.router.navigate(['/home'])

  }

}
