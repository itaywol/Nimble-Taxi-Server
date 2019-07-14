import { NestFactory } from '@nestjs/core';
import { RouterModule } from './router.module';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const router = await NestFactory.create(RouterModule, {logger:false});
  router.useLogger(router.get(LoggerService));
  router.enableCors();
  await router.listen(3001);
}
bootstrap();
