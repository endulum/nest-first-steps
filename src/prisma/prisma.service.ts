import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async clear() {
    for (const query of [
      'PRAGMA foreign_keys = ON',
      'DELETE FROM "User"',
      "DELETE FROM sqlite_sequence WHERE name = 'User'",
    ])
      await this.$queryRaw`${Prisma.raw(query)}`;
  }
}
