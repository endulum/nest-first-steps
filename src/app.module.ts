import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import {
  InternalServerErrorExceptionFilter,
  NotFoundExceptionFilter,
} from './shared/http-exception.filters';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AccountModule, PrismaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: InternalServerErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
