import { Controller, Post, Get, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateRequestDTO } from './dto/createRequestDTO';
import { TaxiService } from './taxi.service';
import { UpdateRequestDTO } from './dto/updateRequestDTO';
import { DriverDataDTO } from './dto/driverDataDto';
import { LoggerService } from 'src/logger/logger.service';
import { IDriver } from './interfaces/IDriver';

@Controller('taxi/')
export class TaxiController {
    constructor(private readonly taxiServices:TaxiService){}
    @Post("request")
    async createTaxiRequest(@Body() createRequestDTO:CreateRequestDTO){
        return await this.taxiServices.createRequest(createRequestDTO);
    }

    @Get("request")
    async getAllTaxiRequests(){
        return await this.taxiServices.getAllTaxiRequests();
    }
    @Get("request/:id")
    async getSingleTaxiRequest(@Param("id", new ParseIntPipe()) requestId:number){
        return await this.taxiServices.getSingleTaxiRequest(requestId);
    }
    @Put("request")
    async updateAllTaxiRequests(@Body("password") requestPassword:String){
        return await this.taxiServices.updateAllTaxiRequests(requestPassword);
    }
    @Put("request/:id")
    async updateSingleTaxiRequest(@Param("id", new ParseIntPipe()) requestId:number, @Body() updateRequestDTO:UpdateRequestDTO){
        return await this.taxiServices.updateSingleTaxiRequest(requestId,updateRequestDTO);
    }
    @Delete("request")
    async deleteAllTaxiRequests(@Body("password") requestPassword:String){
        return await this.taxiServices.deleteAllTaxiRequests(requestPassword);
    }
    @Delete("request/:id")
    async deleteSingleTaxiRequest(@Param("id", new ParseIntPipe()) requestId:number){
        return await this.taxiServices.deleteSingleTaxiRequest(requestId);
    }

    @Post("driver/")
    reportIdleDriver(@Body("busy") busy:Boolean, @Body("phoneNumber") phoneNumber:String, @Body("currentLocation") currentLocation:String){
        let taxiDriverData = {phoneNumber: phoneNumber, busy:busy, currentLocation:currentLocation} as DriverDataDTO;
        LoggerService.log(taxiDriverData);
        return this.taxiServices.handleDriverReports(taxiDriverData);
    }

    @Get("driver/")
    getAllDrivers(){
        LoggerService.log("trying to get all users");
        return this.taxiServices.getAllDrivers();
    }
}
