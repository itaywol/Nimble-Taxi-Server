import { Module, Controller } from '@nestjs/common';
import { TaxiService } from './taxi.service';
import { TaxiController } from './taxi.controller';
import { QueueService } from './queue/queue.service';
import { BullModule } from 'nest-bull';
import { RequestsQueue } from './queue/requests-queue';
import "dotenv/config";
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from 'src/schemas/driver-schema';

@Module({
    providers: [TaxiService, QueueService, RequestsQueue],
    controllers: [TaxiController],
    imports:[BullModule.forRoot({name:"requests_queue", options: {redis: {host:process.env.REDIS_HOST}}}),MongooseModule.forFeature([{ name: 'Drivers', schema: DriverSchema}])],
    exports:[]
})
export class TaxiModule {}
