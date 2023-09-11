import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements AfterViewInit {
  @ViewChild('scanner', { static: false })
  scanner!: ZXingScannerComponent;

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

  constructor() {}

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
    console.log('Result: ', resultString);
    this.qrResultString = resultString;
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
}
