import {
  Queue,
  QueueProcess,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  OnQueueCleaned,
  OnGlobalQueueFailed,
} from 'nest-bull';
import { QueueService } from './queue.service';
import { CreateRequestDTO } from '../taxi/dto/createRequestDTO';
import { Job, DoneCallback } from 'bull';
import { LoggerService } from '../../logger/logger.service';

@Queue({ name: 'requests_queue' })
export class RequestsQueue {
  constructor(
    private readonly queueService: QueueService,
    private readonly loggerService: LoggerService,
  ) {}

  /**
   * when a queue job is created this is the entry point
   * it tries to fetch a driver that accepeted the request using the queueService.fetch taxis
   * retries 3 times with higher priority
   * then if it didnt find then fail
   * @param job the job with the data that passed in
   * @param doneCallBack a callback to finish the job
   */
  @QueueProcess({ name: 'request' })
  async createRequest(job: Job<CreateRequestDTO>, doneCallBack: DoneCallback) {
    if (
      job.attemptsMade > 1 &&
      job.attemptsMade <= 3 &&
      (await job.isDelayed())
    ) {
      job.promote();
    }

    if (!(await this.queueService.fetchTaxis(job.id))) {
      await job.moveToFailed({ message: 'couldnt find any taxi' });
      await job.retry();
    } else {
      doneCallBack(null, () => {
        return {
          message: 'successfuly found a driver',
          data: job,
        };
      });
    }
    doneCallBack(null, () => {
      return {
        message: "couldn't find a driver",
        data: job,
      };
    });
  }
}
