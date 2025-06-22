import { Response } from 'supertest';

export function expectRes(
  response: Response,
  expectedCode: number,
  expectedMessage?: string,
) {
  expect({
    status: response.status,
    ...(expectedMessage && { message: response.body.message }),
  }).toEqual({
    status: expectedCode,
    ...(expectedMessage && { message: expectedMessage }),
  });
}
