import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectQueue } from 'nest-bull';
import { Queue } from 'bull';
import { CreateRequestDTO } from './dto/createRequestDTO';

@Injectable()
export class TaxiService {
  constructor(@InjectQueue('requests_queue') private readonly queue: Queue) {}

  /**
   * moves a single job to failed rather then deleting 
   * @param requestId unique identifier
   */
  async deleteSingleTaxiRequest(requestId: number) {
    return {
      message: 'deleting a specific job with id:' + requestId,
      data: await this.queue.getJob(requestId).then(job => {
        return job.moveToFailed({ message: 'Job cancelled' });
      }),
    };
  }
  /**
   * delete all requsts from the queue
   * @param password admin password
   */
  async deleteAllTaxiRequests(password: String) {
    if (password == process.env.ADMIN_PASSWORD) {
      return {
        message: 'deleting all jobs',
        data: await this.queue.empty(),
      };
    }
  }

  /**
   * updates a single requst
   * @param requestId unique requst id
   * @param updatedData new data to apply for the request
   */
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

  /**
   * gets a single request based on requestID
   * @param requestId unique request id
   */
  async getSingleTaxiRequest(requestId: number) {
    return {
      message: 'retrieving a specific job with id:' + requestId,
      data: await this.queue.getJob(requestId),
    };
  }

  /**
   * gets all taxi requests(queue waiting jobs)
   */
  async getAllTaxiRequests() {
    return {
      message: 'retrieving all jobs status',
      data: await this.queue.getWaiting(),
    };
  }
  /**
   * creates a request for taxi in the queue passing the request data
   * @param createRequestDTO the taxi request data
   */
  async createRequest(createRequestDTO: CreateRequestDTO) {
    let job = await this.queue.add('request', createRequestDTO, {
      delay: 5000,
    });
    return HttpStatus.OK;
  }
}
