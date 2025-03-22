import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformIdInterceptor } from './interceptors/tranform-id.interceptors';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();

  app.useGlobalInterceptors(new TransformIdInterceptor());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
