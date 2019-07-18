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
  /**
   * call taxi service to hande a creation of request
   * @param createRequestDTO data of the taxi request
   */
  @Post('request')
  async createTaxiRequest(@Body() createRequestDTO: CreateRequestDTO) {
    return await this.taxiServices.createRequest(createRequestDTO);
  }

  /**
   * call taxi service to return all available requests
   */
  @Get('request')
  async getAllTaxiRequests() {
    return await this.taxiServices.getAllTaxiRequests();
  }
  /**
   * call taxi service to return a specific request based on requestID
   * @param requestId request unique identifier id
   */
  @Get('request/:id')
  async getSingleTaxiRequest(
    @Param('id', new ParseIntPipe()) requestId: number,
  ) {
    return await this.taxiServices.getSingleTaxiRequest(requestId);
  }
  /**
   * calls taxi service to update a specific request
   * @param requestId unique identifier
   * @param updateRequestDTO the new request data
   */
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

  /**
   * call taxi service to delete all taxi requests
   * @param requestPassword admin password defined .env file 
   */
  @Delete('request')
  async deleteAllTaxiRequests(@Body('password') requestPassword: String) {
    return await this.taxiServices.deleteAllTaxiRequests(requestPassword);
  }

  /**
   * calls taxi service to delete a specific requsts with request id 
   * @param requestId requst id identifier
   */
  @Delete('request/:id')
  async deleteSingleTaxiRequest(
    @Param('id', new ParseIntPipe()) requestId: number,
  ) {
    return await this.taxiServices.deleteSingleTaxiRequest(requestId);
  }
}
