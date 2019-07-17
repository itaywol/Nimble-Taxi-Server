import { NestFactory } from '@nestjs/core';
import { RouterModule } from './router.module';
import { LoggerService } from './logger/logger.service';
import { readFileSync } from 'fs';

async function bootstrap() {
  const httpOptions = {
    key: readFileSync('src/secret/key.pem'),
    cert: readFileSync('src/secret/cert.pem'),
  };
  const router = await NestFactory.create(RouterModule, {
    logger: false,
    httpsOptions: httpOptions,
  });
  router.useLogger(router.get(LoggerService));
  router.enableCors();
  await router.listen(3001);
}
bootstrap();
