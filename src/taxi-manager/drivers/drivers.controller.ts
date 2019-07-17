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

  @Post()
  async createDriver(@Body() driverData: DriverDataDTO) {
    return await this.driverServices.createDriver(driverData);
  }

  @Get()
  async getAllDrivers() {
    return await this.driverServices.getAllDrivers();
  }

  @Get(':phone')
  async getSpecificDriver(@Param('phone') phoneAsIdentifier: String) {
    return await this.driverServices.getSpecificDriver(phoneAsIdentifier);
  }

  @Put()
  async updateAllDrivers(@Body() driverData: DriverDataDTO) {
    return await this.driverServices.updateAllDrivers(driverData);
  }

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

  @Delete()
  async deleteAllDrivers() {
    return await this.driverServices.deleteAllDrivers();
  }

  @Delete(':phone')
  async deleteSpecificDriver(@Param('phone') phoneAsIdentifier: String) {
    return await this.driverServices.deleteSpecificDriver(phoneAsIdentifier);
  }

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
