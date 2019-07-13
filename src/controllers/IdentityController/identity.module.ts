import { Module } from '@nestjs/common';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import {ConsoleLogger} from "../../plugins/logger";

@Module({
  controllers: [IdentityController],
  providers: [IdentityService,ConsoleLogger],
})
export class IdentityModule {}
