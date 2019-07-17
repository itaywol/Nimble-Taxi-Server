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
import { LoggerService } from 'src/logger/logger.service';
import { DriverDataDTO } from './dto/driverDataDto';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driverServices: DriversService) {}

  @Post()
  async createDriver(@Body() driverData: DriverDataDTO) {
    return this.driverServices.createDriver(driverData);
  }

  @Get()
  getAllDrivers() {
    return this.driverServices.getAllDrivers();
  }

  @Get(':phone')
  getSpecificDriver(@Param('phone') phoneAsIdentifier: String) {
    return this.driverServices.getSpecificDriver(phoneAsIdentifier);
  }

  @Put()
  updateAllDrivers(@Body() driverData: DriverDataDTO) {
    return this.driverServices.updateAllDrivers(driverData);
  }

  @Put(':phone')
  updateSpecificDriver(
    @Param('phone') phoneAsIdentifier: String,
    @Body() driverData: DriverDataDTO,
  ) {
    return this.driverServices.updateSpecificDriver(
      phoneAsIdentifier,
      driverData,
    );
  }

  @Delete()
  deleteAllDrivers() {
    return this.driverServices.deleteAllDrivers();
  }

  @Delete(':phone')
  deleteSpecificDriver(@Param('phone') phoneAsIdentifier: String) {
    return this.driverServices.deleteSpecificDriver(phoneAsIdentifier);
  }

  @Post('distance/:kilometers')
  getDriversByDistance(
    @Body('longtitude', new ParseIntPipe()) longtitude: number,
    @Body('latitude', new ParseIntPipe()) latitude: number,
    @Param('kilometer', new ParseIntPipe()) distanceInKilometers: number,
  ) {
    return this.driverServices.getAllDriversByDistance(
      latitude,
      longtitude,
      distanceInKilometers,
    );
  }
}
