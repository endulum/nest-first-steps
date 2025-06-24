import { createTestApp } from '../helpers/app';
import { type NestApp } from '../helpers/types';
import { req } from '../helpers/req.helper';
import { expectRes } from '../helpers/expectRes.helper';
import { App } from 'supertest/types';
import { PrismaService } from 'src/prisma/prisma.service';

describe('catchall (e2e)', () => {
  let nestApp: NestApp;
  let app: App;
  let prisma: PrismaService;

  beforeAll(async () => {
    nestApp = await createTestApp();
    app = nestApp.getHttpServer();
    prisma = nestApp.get<PrismaService>(PrismaService);
    await prisma.clear();
  });

  afterAll(async () => {
    await nestApp.close();
  });

  it('404', async () => {
    const url = '/owo';
    const res = await req(app, `GET ${url}`);
    expectRes(res, 404, `Nothing found at ${url}`);
  });
}); 