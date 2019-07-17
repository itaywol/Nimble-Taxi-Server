import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDriver } from './interfaces/IDriver';
import { DriverDataDTO } from './dto/driverDataDto';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel('Drivers') private readonly driversList: Model<IDriver>,
  ) {}
  async fetchOneDriver(driverReportData: DriverDataDTO) {
    let driver = await this.driversList.findOne(driverReportData);
    if (driver) {
      return true;
    } else {
      return false;
    }
  }

  async getAllDrivers() {
    return await this.driversList.find().exec();
  }

  async handleDriverReports(driverReportData: DriverDataDTO) {
    let DriverReportDataBusy: String = driverReportData.busy.toString();
    if (DriverReportDataBusy === 'false') {
      if (!(await this.fetchOneDriver(driverReportData))) {
        const createdDriver = await new this.driversList(driverReportData);
        createdDriver.save();
      } else {
        await this.driversList.remove({
          phoneNumber: driverReportData.phoneNumber,
        });
        const newCreatedDriver = await new this.driversList(driverReportData);
        await newCreatedDriver.save();
      }
    } else {
      await this.driversList.remove({
        phoneNumber: driverReportData.phoneNumber,
      });
    }
    return HttpStatus.OK;
  }
}
