import { Response } from 'supertest';

import { expectPayload } from './expectPayload.helper';

export function expectRes(
  response: Response,
  expectedCode: number,
  expectedMessage?: string,
) {
  expectPayload(response);

  try {
    expect({
      status: response.status,
      ...(expectedMessage && { message: response.body.message }),
    }).toEqual({
      status: expectedCode,
      ...(expectedMessage && { message: expectedMessage }),
    });
  } catch (error) {
    if (response.status === 400 && expectedCode !== 400) {
      console.log(response.body);
    }
    throw error;
  }
}
