import { App } from 'supertest/types';

import { req } from './req.helper';
import { expectRes } from './expectRes.helper';

export async function expectErrors({
  app,
  endpoint,
  token,
  correctForm,
  wrongFields,
}: {
  app: App;
  endpoint: string;
  token?: string;
  correctForm: Record<string, string>;
  wrongFields: Array<Record<string, string | undefined>>;
}) {
  for (const wrongField of wrongFields) {
    const form = { ...correctForm, ...wrongField };
    const res = await req(app, endpoint, {
      ...(token && { token }),
      form,
    });
    try {
      expectRes(
        res,
        400,
        'There are some validation errors with your submission.',
      );
    } catch (err) {
      console.log(res.body, form);
      throw err;
    }
  }

  // could use Promise.all(), but this causes ECONNRESET in testing
}
