import { Test, TestingModule } from '@nestjs/testing';
import { PhoneVerifierController } from './phone-verifier.controller';

describe('PhoneVerifier.Controller Controller', () => {
  let controller: PhoneVerifierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneVerifierController],
    }).compile();

    controller = module.get<PhoneVerifierController>(PhoneVerifierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
