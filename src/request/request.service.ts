import { Injectable } from '@nestjs/common';
import { UpdateRequestDto } from './dto/update-request-dto';
import { CreateRequestDto } from './dto/create-request-dto';
import { InjectQueue } from 'nest-bull';
import { Queue } from 'bull';

@Injectable()
export class RequestService {
    constructor(@InjectQueue("request_queue") private readonly requestsQueue:Queue){}

    removeTaxiRequest(taxiRequestId: number, requestData: UpdateRequestDto) {
        throw new Error("Method not implemented.");
    }
    removeAllTaxiRequests() {
        throw new Error("Method not implemented.");
    }
    async updateTaxiRequest(taxiRequestId: number, requestData: UpdateRequestDto) {
        
    }
    async getTaxiRequest(requestId: number) {
        return {
            message: `Retrieve specified taxi requests with id number: ${requestId}`,
            data: await this.requestsQueue.getJob(requestId)
        }
    }
    async getAllTaxiRequests() {
        return {
            message: "Retrieve all taxi requests",
            data: await this.requestsQueue.getJobs(["request"])
        }
    }
    async createNewRequest(createRequestDto: CreateRequestDto) {
        return {
            message: "creating new taxi request",
            data: await this.requestsQueue.add("request",createRequestDto)
        }
    }

}
