import { NestFactory } from '@nestjs/core';
import { RouterModule } from './router.module';
import { LoggerService } from './logger/logger.service';
import { readFileSync } from 'fs';
import 'dotenv/config';

async function bootstrap() {
  const httpOptions = {
    key: readFileSync('src/secret/key.pem'),
    cert: readFileSync('src/secret/cert.pem'),
  };
  if (process.env.IS_HTTPS == 'true') {
    const router = await NestFactory.create(RouterModule, {
      logger: new LoggerService(),
      httpsOptions: httpOptions,
    });
    router.enableCors();
    await router.listen(3001);
  }
  else{
    const router = await NestFactory.create(RouterModule, {
      logger: new LoggerService()
    });
    router.enableCors();
    await router.listen(3001);
  }
}
bootstrap();
