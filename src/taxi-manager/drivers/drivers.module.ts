import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from '../../schemas/driver-schema';
import { LoggerService } from '../../logger/logger.service';
import { HelperModuleService } from '../../helper-module/helper-module.service';
import { HelperModuleModule } from '../../helper-module/helper-module.module';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [
    MongooseModule.forFeature([{ name: 'Drivers', schema: DriverSchema }]),
    LoggerModule,
    HelperModuleModule,
  ],
  exports: [DriversService],
})
export class DriversModule {}
