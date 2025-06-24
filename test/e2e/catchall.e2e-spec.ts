import { req } from '../helpers/req.helper';
import { expectRes } from '../helpers/expectRes.helper';

describe('catchall', () => {
  it('404', async () => {
    const url = '/owo';
    const res = await req(app, `GET ${url}`);
    expectRes(res, 404, `Nothing found at ${url}`);
  });
});
