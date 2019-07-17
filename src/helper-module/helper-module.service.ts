import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class HelperModuleService {

  generateDigitalNumber(digitsCount: number) {
    if (digitsCount <= 0) {
      digitsCount = 6;
    }
    let stringTemplate = '';
    for (let i = 0; i < digitsCount; i++) {
      stringTemplate += Math.round(Math.random() * 9);
    }
    return stringTemplate;
  }

  /**
   * Returns the distance in meters between two cooridantes using longtitude and latitude
   * @param lon1 First Longtitude value
   * @param lat1 First Latitude value
   * @param lon2 Second Longtitude value
   * @param lat2 Second Latitude Value
   */
  calculateDistance(lon1: number, lat1: number, lon2: number, lat2: number) {
    const earthRadius: number = 6371000;
    let radiansL1: number = this.toRadians(lon1);
    let radiansL2: number = this.toRadians(lon2);
    let deltaLat: number = this.toRadians(lat2 - lat1);
    let deltaLon: number = this.toRadians(lon2 - lon1);

    let stage1: number =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(radiansL1) *
        Math.cos(radiansL2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    let stage2: number =
      2 * Math.atan2(Math.sqrt(stage1), Math.sqrt(1 - stage1));
    let d: number = earthRadius * stage2;

    return d;
  }

  /**
   * Converts degress to radians
   * @param degress Number as a degree
   */
  toRadians(degress: number) {
    let pi: number = Math.PI;
    return degress * (pi / 180);
  }
}
