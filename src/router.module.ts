import { Module } from '@nestjs/common';
import { AuthModule } from './authApi/auth.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { HelperModuleModule } from './helper-module/helper-module.module';
import { SmsmessagerModule } from './smsmessager/smsmessager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxiModule } from './taxi-manager/taxi/taxi.module';
import { GoogleModule } from './google/google.module';
import { GoogleService } from './google/google.service';
import { QueueModule } from './taxi-manager/requests/queue.module';
import 'dotenv/config';
import { DriversModule } from './taxi-manager/drivers/drivers.module';

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    HelperModuleModule,
    SmsmessagerModule,
    MongooseModule.forRoot(process.env.MONGO_PATH),
    TaxiModule,
    GoogleModule,
    QueueModule,
    DriversModule,
  ]
})
export class RouterModule {}
