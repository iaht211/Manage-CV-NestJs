import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modules } from './modules';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformIdInterceptor } from './interceptors/tranform-id.interceptors';

@Module({
  imports: Modules,
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformIdInterceptor,
    },
  ],
})
export class AppModule {}
