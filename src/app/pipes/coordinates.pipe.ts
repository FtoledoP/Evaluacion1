import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coordinates',
})
export class CoordinatesPipe implements PipeTransform {
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
}
