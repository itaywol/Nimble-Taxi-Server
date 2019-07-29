import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectQueue } from 'nest-bull';
import { Queue } from 'bull';
import { CreateRequestDTO } from './dto/createRequestDTO';
import 'dotenv/config';

@Injectable()
export class TaxiService {
  constructor(@InjectQueue('requests_queue') private readonly queue: Queue) {}

  async deleteSingleTaxiRequest(requestId: number) {
    return {
      message: 'deleting a specific job with id:' + requestId,
      data: await this.queue.getJob(requestId).then(job => {
        return job.moveToFailed({ message: 'Job cancelled' });
      }),
    };
  }
  async deleteAllTaxiRequests(password: String) {
    if (password == process.env.ADMIN_PASSWORD) {
      return {
        message: 'deleting all jobs',
        data: await this.queue.empty(),
      };
    }
  }
  async updateSingleTaxiRequest(
    requestId: number,
    updatedData: CreateRequestDTO,
  ) {
    return {
      message: 'updaob with id: ' + requestId,
      data: await this.queue.getJob(requestId).then(job => {
        job.update(updatedData);
      }),
    };
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
      data: await this.queue.getWaiting(),
    };
  }
  async createRequest(createRequestDTO: CreateRequestDTO) {
    const job = await this.queue.add('request', createRequestDTO, {
      delay: 5000,
    });
    return HttpStatus.OK;
  }
}
