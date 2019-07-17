import { Controller, Post, Body, Get } from '@nestjs/common';
import { DriverDataDTO } from './dto/driverDataDto';
import { LoggerService } from 'src/logger/logger.service';
import { DriversService } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driverServices: DriversService) {}
  @Post('driver/')
  reportIdleDriver(
    @Body('busy') busy: Boolean,
    @Body('phoneNumber') phoneNumber: String,
    @Body('currentLocation') currentLocation: String,
  ) {
    let taxiDriverData = {
      phoneNumber: phoneNumber,
      busy: busy,
      currentLocation: currentLocation,
    } as DriverDataDTO;
    LoggerService.log(taxiDriverData);
    return this.driverServices.handleDriverReports(taxiDriverData);
  }

  @Get('driver/')
  getAllDrivers() {
    LoggerService.log('trying to get all users');
    return this.driverServices.getAllDrivers();
  }
}
