import { createTestApp } from '../helpers/app';
import { PrismaService } from 'src/prisma/prisma.service';
import { type NestApp } from '../helpers/types';

let nestApp: NestApp;

beforeAll(async () => {
  nestApp = await createTestApp();
  globalThis.app = nestApp.getHttpServer();
  globalThis.prisma = nestApp.get<PrismaService>(PrismaService);
  await globalThis.prisma.clear();
});

afterAll(async () => {
  await nestApp.close();
});
