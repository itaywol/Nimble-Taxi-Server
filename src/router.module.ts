import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { HelperModuleModule } from './helper-module/helper-module.module';
import { SmsmessagerModule } from './smsmessager/smsmessager.module';

@Module({
  imports: [AuthModule, LoggerModule, HelperModuleModule, SmsmessagerModule],
  providers: [LoggerService]
})
export class RouterModule {}
