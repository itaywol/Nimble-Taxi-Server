import {
  Controller,
  Get,
  Req,
  Post,
  Param,
  Body,
  Query,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { IdentityService } from './identity.service';
import { identityDto } from '../../models/identitydto';
import { ConsoleLogger } from '../../plugins/logger';
import { nodeInternals } from 'stack-utils';

@Controller('identity')
export class IdentityController {
  constructor(
    private readonly identityService: IdentityService,
    private readonly consoleLogger: ConsoleLogger,
  ) {}

  @Post()
  async create(@Body() createIdentityDto: identityDto) {
    createIdentityDto = {
      firstName: 'itay',
      lastName: 'wolfish',
      id: 1,
      phoneNumber: '0544207711',
    };
    this.identityService.create(createIdentityDto);
    this.consoleLogger.log(`Created new Identity - ${createIdentityDto}`);
  }
  
  @Get()
  async getAllIdentities(@Query() query: identityDto): Promise<identityDto[]> {
    //can return a promise or using the rxjs an Observable
    return this.identityService.findAll();
  }

  @Get(':id') //made a get request in the controller with ID Paramter
  // the @Param decorator is used to expose the request paramters to
  //the function methods @Param params for all params or @Param("prmName") for specific parameter name
  async getOneIdentity(@Param('id') id) {
    console.log(id);
    return `this action return a #${id} cat`;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() identityDto: identityDto) {
    return `this action updates identity with number#${id} with model ${identityDto}`;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return `this action removes identity with #${id}`;
  }
}
