import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from '@/configs/app.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
