import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import 'dotenv/config';
import { LoggerService } from '../logger/logger.service';
import { ISearchQuery } from './interfaces/ISearchQuery';

const apiKey = process.env.GOOGLE_API_KEY;
@Injectable()
export class GoogleService {
  constructor(private readonly loggerService: LoggerService) {}
  async queryPlacesFromGoogle(findPlace: String) {
    let results: ISearchQuery[] = [];
    await Axios.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${findPlace}&language=iw&region=il&key=${apiKey}`,
    ).then(respone => {
      results.push({
        address: respone.data.results[0].formatted_address,
        longtitude: respone.data.results[0].geometry.location.lng,
        latitude: respone.data.results[0].geometry.location.lat,
      } as ISearchQuery);
    });
    if (results) {
      this.loggerService.log(results);
      return results;
    }
    return null;
  }

  /**
   * finds the route using the google routes api using cordinates(origin,destination)
   * @param originLon origin Longtitude
   * @param originLat origin Latitude
   * @param destinationLon destination Longtitude
   * @param destinationLat destination Latitude
   */
  async queryRouteFromGoogleCords(
    originLon: number,
    originLat: number,
    destinationLon: number,
    destinationLat: number,
  ) {
    await Axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLon}&destination=${destinationLat},${destinationLon}&language=iw&region=il&key=${apiKey}`,
    ).then(response => {
      return response.data;
    });
  }

  /**
   * finds a route to place using places name
   * @param origin origin place name
   * @param destination destination place name
   */
  async queryRouteFromGooglePlaces(origin: String, destination: String) {
    await Axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&language=iw&region=il&key=${apiKey}`,
    ).then(response => {
      return response.data;
    });
  }
}
