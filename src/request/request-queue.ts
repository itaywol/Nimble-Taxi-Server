import { Queue, QueueProcess } from 'nest-bull';
import { LoggerService } from 'src/logger/logger.service';
import { IRequest } from './interfaces/irequest.interface';
import { Job, DoneCallback } from 'bull';

@Queue({ name: 'request_queue' })
export class RequestQueue {
  constructor(private readonly loggerService: LoggerService) {}
  workers = [{ name: String }];

  @QueueProcess({ name: 'request' })
  processRequest(job: Job<IRequest>, callback: DoneCallback) {
    this.loggerService.log(`processing job: ${job}`);
  }
}
