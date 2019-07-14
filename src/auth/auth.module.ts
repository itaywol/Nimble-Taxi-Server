import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HelperModuleService } from 'src/helper-module/helper-module.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [HelperModuleService]
})
export class AuthModule {}
