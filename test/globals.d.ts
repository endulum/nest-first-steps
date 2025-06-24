import { App } from 'supertest/types';
import { PrismaService } from 'src/prisma/prisma.service';

declare global {
  var app: App;
  var prisma: PrismaService;
}
