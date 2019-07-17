import { Module, Global } from '@nestjs/common';
import { GoogleService } from './google.service';
import { LoggerModule } from '../logger/logger.module';
import { GoogleController } from './google.controller';

@Module({
  providers: [GoogleService],
  imports: [LoggerModule],
  exports: [GoogleService],
  controllers: [GoogleController],
})
export class GoogleModule {}
