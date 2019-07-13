import { Module } from '@nestjs/common';
import { PhoneVerifierController } from './phone-verifier.controller';

@Module({
    controllers: [PhoneVerifierController],
})
export class PhoneVerifierModule {}
