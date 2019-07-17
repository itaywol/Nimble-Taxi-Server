import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDriver } from './interfaces/IDriver';
import { DriverDataDTO } from './dto/driverDataDto';
import { HelperModuleService } from 'src/helper-module/helper-module.service';

@Injectable()
export class DriversService {
  
  constructor(
    @InjectModel('Drivers') private readonly driversList: Model<IDriver>,
    private readonly helperModule: HelperModuleService,
    ) {}
    
    async createDriver(driverData:DriverDataDTO) {
      return await new this.driversList(driverData).save();
    }
    
    async getAllDrivers(): Promise<IDriver[] | null> {
      return await this.driversList.find();
    }
    
    async getSpecificDriver(phoneAsIdentifier:String) {
      return await this.driversList.findOne({phoneNumber:phoneAsIdentifier});
    }
    
    async getAllDriversByDistance(pinPointLatitude:number,pinPointLongtitude:number,distanceInKilometers: number) {
      let results:IDriver[] = [];
      let query:IDriver[] = await this.getAllDrivers();
      query.map((entry:IDriver) => {
        if(this.helperModule.calculateDistance(pinPointLongtitude,pinPointLatitude,entry.currentLongtitude,entry.currentLatitude)*1000<distanceInKilometers)
        {
          results.push(entry);
        }
      })
      return results;
    }
  async updateAllDrivers(driverData:DriverDataDTO) {
    return await this.driversList.update({},driverData)
  }

  async updateSpecificDriver(phoneAsIdentifier:String,driverData:DriverDataDTO) {
    return await this.driversList.update({phoneNumber:phoneAsIdentifier},driverData)
  }

  async deleteAllDrivers() {
    return await this.driversList.remove({});
  }

  async deleteSpecificDriver(phoneAsIdentifier:String) {
    return await this.driversList.remove({phoneNumber:phoneAsIdentifier});
  }
}
