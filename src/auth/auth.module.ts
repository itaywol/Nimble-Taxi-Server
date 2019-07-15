import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HelperModuleService } from 'src/helper-module/helper-module.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from 'src/schemas/user-schema';
import { VerifySchema } from 'src/schemas/verify-schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [HelperModuleService, MongooseModule.forFeature([{ name: "Users", schema: UserSchema}]), MongooseModule.forFeature([{ name: "Verifies", schema: VerifySchema}])]
})
export class AuthModule {}
