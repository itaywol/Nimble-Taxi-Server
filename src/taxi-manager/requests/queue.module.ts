import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { RequestsQueue } from './requests-queue';
import { BullModule } from 'nest-bull';
import { DriversModule } from '../drivers/drivers.module';
import { LoggerModule } from '../../logger/logger.module';
import { HelperModuleModule } from '../../helper-module/helper-module.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from '../../schemas/driver-schema';

@Module({
  providers: [QueueService, RequestsQueue],
  imports: [
    BullModule.forRoot({
      name: 'requests_queue',
      options: { redis: { host: process.env.REDIS_HOST } },
    }),
    DriversModule,
    LoggerModule,
    HelperModuleModule,
    MongooseModule.forFeature([{ name: 'Drivers', schema: DriverSchema }]),
  ],
  exports: [QueueService, RequestsQueue],
})
export class QueueModule {}
