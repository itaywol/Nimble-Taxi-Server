import { Test, TestingModule } from '@nestjs/testing';
import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { identityDto } from 'src/models/identitydto';

describe('IdentityController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [IdentityService],
    }).compile();
  });

  describe('create', () => {
    it('should return new identity', () => {
      const appController = app.get<IdentityController>(IdentityController);
      let newIdentity:identityDto = {
          firstName: "itay",
          lastName: "wolfish",
          id:1,
          phoneNumber:"0544207711",
      }
      expect(appController.create(newIdentity)).toBe('["itay","wolfish",1,"0544207711"]]');
    });
  });
});
