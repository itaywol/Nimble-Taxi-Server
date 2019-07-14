import { Test, TestingModule } from '@nestjs/testing';
import { HelperModuleService } from './helper-module.service';

describe('HelperModuleService', () => {
  let service: HelperModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperModuleService],
    }).compile();

    service = module.get<HelperModuleService>(HelperModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
