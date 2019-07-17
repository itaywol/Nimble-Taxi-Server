import { Queue, QueueProcess, OnQueueActive, OnQueueCompleted, OnQueueProgress, OnQueueCleaned, OnGlobalQueueFailed } from "nest-bull";
import { QueueService } from "./queue.service";
import { CreateRequestDTO } from "../dto/createRequestDTO";
import { Job, DoneCallback } from "bull";
import { LoggerService } from "src/logger/logger.service";

@Queue({name:"requests_queue"})
export class RequestsQueue {
    constructor(private readonly queueService:QueueService, private readonly loggerService:LoggerService){}

    @QueueProcess({name:"request"})
    async createRequest(job: Job<CreateRequestDTO>,doneCallBack:DoneCallback){
        if(job.attemptsMade>1 && job.attemptsMade<=3 && await job.isDelayed())
        {
            job.promote();
        }
        if(!await this.queueService.fetchTaxis(job.attemptsMade))
        {
            await job.moveToFailed({message: "couldnt find any taxi"});
            await job.retry();
        }
        else
        {
            doneCallBack(null,()=>{return job;});
        }
        doneCallBack(null,()=>{return job;});
        
    }

    @OnQueueCleaned()
    onCleaned(){
        
    }

    @OnQueueProgress()
    onProgress(job: Job){
        this.loggerService.log(`Progress in job: ${job.id}`)
    }

    @OnQueueActive()
    onActive(job: Job){
        this.loggerService.log(`Active job ${job.id}`)
    }

    @OnQueueCompleted()
    onCompleted(job:Job)
    {
        this.loggerService.log(`Completed job ${job.id}`)
    }
    
    @OnGlobalQueueFailed()
    onFailed(job:Job){
        this.loggerService.warn(`Job ${job.id} has failed`);
    }
}
