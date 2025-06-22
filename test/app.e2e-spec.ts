import { createTestApp } from './helpers/app';
import { type NestApp } from './helpers/types';
import { req } from './helpers/req.helper';
import { expectRes } from './helpers/expectRes.helper';
import { expectErrors } from './helpers/expectErrors.helper';
import { App } from 'supertest/types';

describe('AppController (e2e)', () => {
  let nestApp: NestApp;
  let app: App;

  beforeAll(async () => {
    nestApp = await createTestApp();
    app = nestApp.getHttpServer();
  });

  afterAll(async () => {
    await nestApp.close();
  });

  describe('catchall', () => {
    it('404', async () => {
      const url = '/owo';
      const res = await req(app, `GET ${url}`);
      expectRes(res, 404, `Nothing found at ${url}`);
    });
  });

  describe('POST /account', () => {
    const correctForm = {
      username: 'user',
      password: 'correct horse battery staple',
      confirmPassword: 'correct horse battery staple',
    };

    it('400 with errors', async () => {
      await expectErrors({
        app,
        endpoint: 'POST /account',
        correctForm,
        wrongFields: [
          { username: '' },
          { username: 'a' },
          { username: Array(100).fill('A').join('') },
          { username: '@@@@' },
          { password: '' },
          { password: 'horse' },
          { confirmPassword: '' },
          { confirmPassword: 'incorrect horse battery staple' },
        ],
      });
    });

    it('201 with data', async () => {
      const res = await req(app, 'POST /account', { form: correctForm });
      expectRes(res, 201, 'Account successfully created.');
      expect(res.body.data).toEqual(correctForm);
    });
  });
});
