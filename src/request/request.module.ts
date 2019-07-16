import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { BullModule } from 'nest-bull';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [BullModule.forRoot({ name: 'request_queue' })],
})
export class RequestModule {}
