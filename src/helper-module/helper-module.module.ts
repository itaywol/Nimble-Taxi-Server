import { Module, Global } from '@nestjs/common';
import { HelperModuleService } from './helper-module.service';
import { LoggerService } from 'src/logger/logger.service';

@Global()
@Module({
  providers: [HelperModuleService],
  imports: [LoggerService],
  exports: [HelperModuleService],
  
})
export class HelperModuleModule {}
