import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDriver } from '../drivers/interfaces/IDriver';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class QueueService {
  constructor(
    @InjectModel('Drivers') private readonly driversList: Model<IDriver>,
    private readonly driversServices: DriversService,
  ) {}

  /**
   * itterates over all the taxi driver that are working and tries to find a taxi driver that accepted the job with the same id as the caller passed in
   * @param jobId the job id that this function been called from asked
   */
  async fetchTaxis(jobId: number) {
    let drivers: IDriver[] = await this.driversServices.getAllDrivers();
    drivers.map((driver: IDriver) => {
      if (driver.jobId == jobId) {
        return true;
      }
    });
    return false;
  }
}
