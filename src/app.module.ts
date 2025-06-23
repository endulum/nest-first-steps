import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { NotFoundExceptionFilter } from './shared/http-exception.filter';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AccountModule, PrismaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    // todo: add filter for server errors
  ],
})
export class AppModule {}
