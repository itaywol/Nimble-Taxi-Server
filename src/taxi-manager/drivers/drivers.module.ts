import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverSchema } from 'src/schemas/driver-schema';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [
    MongooseModule.forFeature([{ name: 'Drivers', schema: DriverSchema }]),
  ],
  exports:[DriversService]
})
export class DriversModule {}
