import * as request from 'supertest';
import { Test } from '@nestjs/testing';
<<<<<<< HEAD
import { AppModule } from './../src/app.module';
=======
import { AppModule } from '../src/controllers/app.module';
>>>>>>> d96ce3de6f91b3d229723210d91ff478e8aba5c1
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
