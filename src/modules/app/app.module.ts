import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from '../../infrastructure/interceptors/logging.interceptor';
import { SallesModule } from '../salles/salles.module';
import { SallesController } from '../salles/salles.controller';
import { SallesService } from '../salles/salles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SallesModule],
  controllers: [AppController, SallesController],
  providers: [
    AppService,
    SallesService,
    JwtService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [JwtService, SallesService],
})
export class AppModule {}
