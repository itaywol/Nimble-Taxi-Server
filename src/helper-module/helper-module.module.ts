import { Module, Global } from '@nestjs/common';
import { HelperModuleService } from './helper-module.service';

@Module({
  providers: [HelperModuleService],
  exports: [HelperModuleService],
})
export class HelperModuleModule {}
