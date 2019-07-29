import { NestFactory } from '@nestjs/core';
import { RouterModule } from './router.module';
import { LoggerService } from './logger/logger.service';
import { readFileSync } from 'fs';
const key = 'src/secret/key.pem';
const cert = 'src/secret/cert.pem';

async function bootstrap() {
  const httpOptions = {
    key: readFileSync(key),
    cert: readFileSync(cert),
  };
  // const router = await NestFactory.create(RouterModule, {
  //   httpsOptions: httpOptions,
  // });
  const router = await NestFactory.create(RouterModule);
  router.enableCors();
  await router.listen(3001);
}
bootstrap();
