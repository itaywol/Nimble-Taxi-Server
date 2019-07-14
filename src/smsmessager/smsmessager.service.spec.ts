import { Test, TestingModule } from '@nestjs/testing';
import { SmsmessagerService } from './smsmessager.service';

describe('SmsmessagerService', () => {
  let service: SmsmessagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsmessagerService],
    }).compile();

    service = module.get<SmsmessagerService>(SmsmessagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
