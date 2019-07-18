import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriverDataDTO } from './dto/driverDataDto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driverServices: DriversService) {}

  /**
   * call the drivers service to create driver based on the request data as DRIVERDATADTO
   * @param driverData request data using driverdto object paramaters
   */
  @Post()
  async createDriver(@Body() driverData: DriverDataDTO) {
    return await this.driverServices.createDriver(driverData);
  }

  /**
   * call the drivers service to get all drivers from the database
   */
  @Get()
  async getAllDrivers() {
    return await this.driverServices.getAllDrivers();
  }

  /**
   * calls the driver service to return a specific driver from the databsae using the unique identifier phone number
   * @param phoneAsIdentifier unique driver identifier paramter
   */
  @Get(':phone')
  async getSpecificDriver(@Param('phone') phoneAsIdentifier: String) {
    return await this.driverServices.getSpecificDriver(phoneAsIdentifier);
  }

  /**
   * calls the driver service toupdates all drivers using specific paramters
   * @param driverData data to pass to all the drivers
   */
  @Put()
  async updateAllDrivers(@Body() driverData: DriverDataDTO) {
    return await this.driverServices.updateAllDrivers(driverData);
  }

  /**
   * calls the driver service to update a specific driver based on phone unqiue identifier
   * @param phoneAsIdentifier unique identifier for driver
   * @param driverData the new driver data to apply
   */
  @Put(':phone')
  async updateSpecificDriver(
    @Param('phone') phoneAsIdentifier: String,
    @Body() driverData: DriverDataDTO,
  ) {
    return await this.driverServices.updateSpecificDriver(
      phoneAsIdentifier,
      driverData,
    );
  }

  /**
   * call the driver service to delete all drivers
   */
  @Delete()
  async deleteAllDrivers() {
    return await this.driverServices.deleteAllDrivers();
  }

  /**
   * calls the driver service to delete a specific driver using unique identifier phoneNumber
   * @param phoneAsIdentifier unique identifier for driver as phone number string
   */
  @Delete(':phone')
  async deleteSpecificDriver(@Param('phone') phoneAsIdentifier: String) {
    return await this.driverServices.deleteSpecificDriver(phoneAsIdentifier);
  }

  /**
   * call the drivers service to return drivers based on thier distance from a specific point
   * @param longtitude pinpoint longtitude for search point
   * @param latitude pinpoint latitude for search point
   * @param distanceInKilometers distance in kilometers to search in
   */
  @Post('distance/:kilometers')
  async getDriversByDistance(
    @Body('longtitude', new ParseIntPipe()) longtitude: number,
    @Body('latitude', new ParseIntPipe()) latitude: number,
    @Param('kilometer', new ParseIntPipe()) distanceInKilometers: number,
  ) {
    return await this.driverServices.getAllDriversByDistance(
      latitude,
      longtitude,
      distanceInKilometers,
    );
  }
}
