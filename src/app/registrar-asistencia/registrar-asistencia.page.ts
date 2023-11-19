import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result, BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LocationService } from '../services/location.service';
import { Geolocation } from '@capacitor/geolocation';
import { Firestore, collection, addDoc, query, where, getDocs, setDoc, doc, getDoc } from '@angular/fire/firestore';

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
              private firestore: Firestore) {
    this.currentUser = this.userService.currentUser;
  }

  transform(coordinates: { latitude: number; longitude: number }): string {
    if (!coordinates || typeof coordinates.latitude !== 'number' || typeof coordinates.longitude !== 'number') {
      return 'Invalid coordinates';
    }

    const lat = coordinates.latitude;
    const lon = coordinates.longitude;

    const latDegrees = Math.floor(lat);
    const latMinutes = (lat - latDegrees) * 60;

    const lonDegrees = Math.floor(lon);
    const lonMinutes = (lon - lonDegrees) * 60;

    return `${latDegrees}° ${latMinutes.toFixed(3)}' N, ${lonDegrees}° ${lonMinutes.toFixed(3)}' W`;
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

  async handleQrCodeResult(resultString: string) {
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
      console.log('From HERE!')
      const clase = this.qrResultString.toString();
      console.log(clase)
      const classRef = collection(this.firestore, 'class');
      setDoc(doc(classRef), {
        Clase: clase,
        Nombre: this.currentUser.nombre,
        Apellido: this.currentUser.apellido,
        Correo: this.currentUser.correo,
        Rut: this.currentUser.rut,
        Carrera: this.currentUser.carrera,
        Region: this.currentUser.region,
        Comuna: this.currentUser.comuna,
        Foto: this.currentUser.selfie,
        Ubicacion: this.transform(this.ubi)}).then(()=>{
          console.log('Se ha registrado la asistencia')
        }).catch(()=>{
          console.log('No se ha registrado la asistencia')
        });
      this.scanner.ngOnDestroy();
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
