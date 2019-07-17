import { Module, Controller } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { QueueService } from '../requests/queue.service';
import { BullModule } from 'nest-bull';
import { RequestsQueue } from '../requests/requests-queue';
import 'dotenv/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from 'src/schemas/driver-schema';

@Module({
  providers: [TaxiService, QueueService, RequestsQueue],
  controllers: [TaxiController],
  imports: [
    BullModule.forRoot({
      name: 'requests_queue',
      options: { redis: { host: process.env.REDIS_HOST } },
    }),
  ],
  exports: [],
})
export class TaxiModule {}
