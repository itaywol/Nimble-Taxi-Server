import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user-schema';
import { VerifySchema } from '../schemas/verify-schema';
import { LoggerModule } from '../logger/logger.module';
import { SmsmessagerModule } from '../smsmessager/smsmessager.module';
import { HelperModuleModule } from '../helper-module/helper-module.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    HelperModuleModule,
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Verifies', schema: VerifySchema }]),
    LoggerModule,
    SmsmessagerModule,
  ],
})
export class AuthModule {}
