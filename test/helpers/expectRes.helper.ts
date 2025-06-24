import { Response } from 'supertest';

import { expectPayload } from './expectPayload.helper';

export function expectRes(
  response: Response,
  expectedCode: number,
  expectedMessage?: string,
) {
  expectPayload(response);

  expect({
    status: response.status,
    ...(expectedMessage && { message: response.body.message }),
  }).toEqual({
    status: expectedCode,
    ...(expectedMessage && { message: expectedMessage }),
  });
}
