import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Get,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request-dto';
import { UpdateRequestDto } from './dto/update-request-dto';
import { RequestService } from './request.service';

@Controller('taxi')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('request')
  createTaxiRequest(@Body() CreateRequestDto: CreateRequestDto) {
    this.requestService.createNewRequest(CreateRequestDto);
  }

  /**
   * authorized/protected get all requests method
   * @param password admin password
   */
  @Get('request')
  getAllTaxiRequests(@Body('password') password: string) {
    this.requestService.getAllTaxiRequests();
  }

  @Get('request/:id')
  getTaxiRequest(@Param('id', new ParseIntPipe()) requestId: number) {
    this.requestService.getTaxiRequest(requestId);
  }

  @Put('request/:id')
  updateTaxiRequest(
    @Param('id', new ParseIntPipe()) taxiRequestId: number,
    @Body() requestData: UpdateRequestDto,
  ) {
    this.requestService.updateTaxiRequest(taxiRequestId, requestData);
  }

  /**
   * authorized/protected delete method to delete all taxi requests
   * @param password admin password
   */
  @Delete('request')
  removeAllTaxiRequests(@Body('password') password: string) {
    this.requestService.removeAllTaxiRequests();
  }

  @Delete('request/:id')
  removeTaxiRequest(
    @Param('id', new ParseIntPipe()) taxiRequestId: number,
    @Body() requestData: UpdateRequestDto,
  ) {
    this.requestService.removeTaxiRequest(taxiRequestId, requestData);
  }
}
