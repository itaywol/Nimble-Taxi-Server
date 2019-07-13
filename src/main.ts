import { NestFactory } from '@nestjs/core';
import { RouterModule } from './router.module';

async function bootstrap() {
  const router = await NestFactory.create(RouterModule);
  await router.listen(3001);
}
bootstrap();
