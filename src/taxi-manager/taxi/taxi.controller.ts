import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateRequestDTO } from './dto/createRequestDTO';
import { TaxiService } from './taxi.service';

@Controller('taxi/')
export class TaxiController {
  constructor(private readonly taxiServices: TaxiService) {}
  @Post('request')
  async createTaxiRequest(@Body() createRequestDTO: CreateRequestDTO) {
    return await this.taxiServices.createRequest(createRequestDTO);
  }

  @Get('request')
  async getAllTaxiRequests() {
    return await this.taxiServices.getAllTaxiRequests();
  }
  @Get('request/:id')
  async getSingleTaxiRequest(
    @Param('id', new ParseIntPipe()) requestId: number,
  ) {
    return await this.taxiServices.getSingleTaxiRequest(requestId);
  }
  @Put('request/:id')
  async updateSingleTaxiRequest(
    @Param('id', new ParseIntPipe()) requestId: number,
    @Body() updateRequestDTO: CreateRequestDTO,
  ) {
    return await this.taxiServices.updateSingleTaxiRequest(
      requestId,
      updateRequestDTO,
    );
  }
  @Delete('request')
  async deleteAllTaxiRequests(@Body('password') requestPassword: String) {
    return await this.taxiServices.deleteAllTaxiRequests(requestPassword);
  }
  @Delete('request/:id')
  async deleteSingleTaxiRequest(
    @Param('id', new ParseIntPipe()) requestId: number,
  ) {
    return await this.taxiServices.deleteSingleTaxiRequest(requestId);
  }
}
