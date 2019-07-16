import { Module, Global } from '@nestjs/common';
import { SmsmessagerService } from './smsmessager.service';

@Global()
@Module({
  providers: [SmsmessagerService],
  exports: [SmsmessagerService],
})
export class SmsmessagerModule {}
