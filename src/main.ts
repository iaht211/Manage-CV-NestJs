import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformIdInterceptor } from './interceptors/tranform-id.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformIdInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
