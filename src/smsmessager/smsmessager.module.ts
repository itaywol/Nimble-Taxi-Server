import { Module, Global } from '@nestjs/common';
import { SmsmessagerService } from './smsmessager.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  providers: [SmsmessagerService],
  exports: [SmsmessagerService],
  imports: [LoggerModule],
})
export class SmsmessagerModule {}
