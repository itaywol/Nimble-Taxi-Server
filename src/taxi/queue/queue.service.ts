import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IDriver } from '../interfaces/IDriver';

@Injectable()
export class QueueService {

    constructor(@InjectModel('Drivers') private readonly driversList: Model<IDriver>){}
    
    async fetchTaxis(x:number):Promise<Boolean> {
        if(x<5)
        return false;
        else
        return true;
    }
}
