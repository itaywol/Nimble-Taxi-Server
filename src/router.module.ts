import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { HelperModuleModule } from './helper-module/helper-module.module';
import { SmsmessagerModule } from './smsmessager/smsmessager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxiModule } from './taxi/taxi.module';
import { GoogleService } from './google/google.service';
import { GoogleModule } from './google/google.module';
import "dotenv/config";

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    HelperModuleModule,
    SmsmessagerModule,
    MongooseModule.forRoot(process.env.MONGO_PATH),
    TaxiModule,
    GoogleModule
  ],
  providers: [LoggerService, GoogleService],
})
export class RouterModule {}
