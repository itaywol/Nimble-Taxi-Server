import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { InjectQueue } from 'nest-bull';
import { Queue, JobStatus } from 'bull';
import { CreateRequestDTO } from './dto/createRequestDTO';
import { UpdateRequestDTO } from './dto/updateRequestDTO';
import { LoggerService } from 'src/logger/logger.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDriver } from './interfaces/IDriver';
import { DriverDataDTO } from './dto/driverDataDto';

@Injectable()
export class TaxiService {
  constructor(
    @InjectQueue('requests_queue') private readonly queue: Queue,
    @InjectModel('Drivers') private readonly driversList: Model<IDriver>,
  ) {}

  async deleteSingleTaxiRequest(requestId: number) {
    return {
      message: 'deleting a specific job with id:' + requestId,
      data: await this.queue.getJob(requestId).then(job => {
        return job.remove;
      }),
    };
  }
  async deleteAllTaxiRequests(requestPassword: String) {
    return {
      message: 'deleting all jobs',
      data: await this.queue.empty(),
    };
  }
  async updateSingleTaxiRequest(
    requestId: number,
    updatedData: UpdateRequestDTO,
  ) {
    return {
      message: 'updating a single job with id: ' + requestId,
      data: await this.queue.getJob(requestId).then(job => {
        job.update(updatedData);
      }),
    };
  }
  async updateAllTaxiRequests(requestData: String) {
    throw new Error('Method not implemented.');
  }
  async getSingleTaxiRequest(requestId: number) {
    return {
      message: 'retrieving a specific job with id:' + requestId,
      data: await this.queue.getJob(requestId),
    };
  }
  async getAllTaxiRequests() {
    return {
      message: 'retrieving all jobs status',
      data: await this.queue.getJobCounts(),
    };
  }
  async createRequest(createRequestDTO: CreateRequestDTO) {
    let job = await this.queue.add('request', createRequestDTO, {
      delay: 5000,
    });
    while (!job.isCompleted()) {
      LoggerService.log('working on job');
    }
    return job.data;
  }

  async handleDriverReports(driverReportData: DriverDataDTO) {
    let DriverReportDataBusy:String = driverReportData.busy.toString();
    if (DriverReportDataBusy === "false") {
      if (!(await this.fetchOneDriver(driverReportData))) {
        const createdDriver = await new this.driversList(driverReportData);
        createdDriver.save();
      } else {
        await this.driversList.remove({phoneNumber:driverReportData.phoneNumber});
        const newCreatedDriver = await new this.driversList(driverReportData);
        await newCreatedDriver.save();
      }
    }else
    {
        await this.driversList.remove({phoneNumber:driverReportData.phoneNumber});
    }
    return HttpStatus.OK
  }

  async fetchOneDriver(driverReportData: DriverDataDTO) {
    let driver = await this.driversList.findOne(driverReportData);
    if (driver) {
      return true;
    } else {
      return false;
    }
  }

  async getAllDrivers(){
      return await this.driversList.find().exec();
  }
}
