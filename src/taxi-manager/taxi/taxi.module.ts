import { Module, Controller } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { QueueService } from '../requests/queue.service';
import { BullModule } from 'nest-bull';
import { RequestsQueue } from '../requests/requests-queue';
import 'dotenv/config';
import { LoggerModule } from '../../logger/logger.module';
import { HelperModuleModule } from '../../helper-module/helper-module.module';
import { DriversModule } from '../drivers/drivers.module';
import { QueueModule } from '../requests/queue.module';

@Module({
  providers: [TaxiService],
  controllers: [TaxiController],
  imports: [
    QueueModule,
    LoggerModule,
    HelperModuleModule,
    DriversModule,
    BullModule.forRoot({
      name: 'requests_queue',
      options: { redis: { host: process.env.REDIS_HOST } },
    }),
  ],
  exports: [TaxiService],
})
export class TaxiModule {}
