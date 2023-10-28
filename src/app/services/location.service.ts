import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

interface Location {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): Promise<Location> {
    return new Promise<Location>((resolve, reject) => {
      Geolocation.requestPermissions()
        .then(() => {
          Geolocation.getCurrentPosition()
            .then((resp) => {
              console.log(resp);
              const location: Location = {
                latitude: resp.coords.latitude,
                longitude: resp.coords.longitude
              };
              resolve(location); // Resuelve la promesa con la ubicación
            })
            .catch((error) => {
              console.log('Error getting location', error);
              const location: Location = {
                latitude: 0,
                longitude: 0
              };
              resolve(location); // Resuelve la promesa con la ubicación predeterminada
            });
        })
        .catch((error) => {
          console.log('Error requesting permissions', error);
          const location: Location = {
            latitude: 0,
            longitude: 0
          };
          resolve(location); // Resuelve la promesa con la ubicación predeterminada en caso de error de permisos
        });
    });
  }
}
