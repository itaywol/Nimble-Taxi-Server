import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { HelperModuleModule } from './helper-module/helper-module.module';
import { SmsmessagerModule } from './smsmessager/smsmessager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from './request/request.controller';
import { RequestModule } from './request/request.module';
import Config from 'config';

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    HelperModuleModule,
    SmsmessagerModule,
    MongooseModule.forRoot(Config.mongodb_path),
    RequestModule,
  ],
  providers: [LoggerService],
  controllers: [RequestController],
})
export class RouterModule {}
