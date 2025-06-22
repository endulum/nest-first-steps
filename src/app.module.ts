import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AccountModule } from './account/account.module';
import { NotFoundExceptionFilter } from './shared/http-exception.filter';

@Module({
  imports: [AccountModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
