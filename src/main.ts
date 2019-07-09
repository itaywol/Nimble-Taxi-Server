import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
=======
import { AppModule } from './controllers/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
>>>>>>> d96ce3de6f91b3d229723210d91ff478e8aba5c1
}
bootstrap();
