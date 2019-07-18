import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDriver } from './interfaces/IDriver';
import { DriverDataDTO } from './dto/driverDataDto';
import { HelperModuleService } from '../../helper-module/helper-module.service';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel('Drivers') private readonly driversList: Model<IDriver>,
    private readonly helperModule: HelperModuleService,
  ) {}

  /**
   * creates driver based on request data transformed to DTO
   * @param driverData driver data as DTO object of driverdatadto
   */
  async createDriver(driverData: DriverDataDTO) {
    return await new this.driversList(driverData).save();
  }

  /**
   * returns all drivers
   */
  async getAllDrivers(): Promise<IDriver[] | null> {
    return await this.driversList.find();
  }

  /**
   * return a specific driver based on phone number
   * @param phoneAsIdentifier unique identifier for the search query
   */
  async getSpecificDriver(phoneAsIdentifier: String) {
    return await this.driversList.findOne({ phoneNumber: phoneAsIdentifier });
  }

  /**
   * gets all driver by distance from point using latitude and longtitude and distance in kilometers for search radius
   * @param pinPointLatitude search point latitude
   * @param pinPointLongtitude search point longtitude
   * @param distanceInKilometers distance in kilometers to apply the search
   */
  async getAllDriversByDistance(
    pinPointLatitude: number,
    pinPointLongtitude: number,
    distanceInKilometers: number,
  ) {
    let results: IDriver[] = [];
    let query: IDriver[] = await this.getAllDrivers();
    query.map((entry: IDriver) => {
      if (
        this.helperModule.calculateDistance(
          pinPointLongtitude,
          pinPointLatitude,
          entry.currentLongtitude,
          entry.currentLatitude,
        ) *
          1000 <
        distanceInKilometers
      ) {
        results.push(entry);
      }
    });
    return results;
  }

  /**
   * ypdates all drivers based on the request data
   * @param driverData the data to apply to all of the drivers
   */
  async updateAllDrivers(driverData: DriverDataDTO) {
    return await this.driversList.update({}, driverData);
  }

  /**
   * updates a specific driver based on phone as identifier and request data as driverdatadto
   * @param phoneAsIdentifier unique driver indentifier
   * @param driverData the new data to apply 
   */
  async updateSpecificDriver(
    phoneAsIdentifier: String,
    driverData: DriverDataDTO,
  ) {
    return await this.driversList.update(
      { phoneNumber: phoneAsIdentifier },
      driverData,
    );
  }

  /**
   * deletes all the drivers
   */
  async deleteAllDrivers() {
    return await this.driversList.remove({});
  }

  /**
   * delete a specific driver based on phone as identifier
   * @param phoneAsIdentifier unique phone identfier
   */
  async deleteSpecificDriver(phoneAsIdentifier: String) {
    return await this.driversList.remove({ phoneNumber: phoneAsIdentifier });
  }
}
