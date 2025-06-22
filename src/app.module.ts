import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { NotFoundController } from './etc/not-found.controller';

@Module({
  imports: [AccountModule],
  controllers: [NotFoundController],
})
export class AppModule {}
