import { Module } from '@nestjs/common';
import { IdentityModule } from "./controllers/IdentityController/identity.module"
import { PhoneVerifierModule } from './controllers/PhoneVerfierController/phone-verifier.module';

@Module({
  imports: [IdentityModule,PhoneVerifierModule]
})
export class RouterModule {}
