import { Response } from 'supertest';

// ensures payload fits the shape outlined in documentation/response_payloads
export function expectPayload(response: Response) {
  // body must be a key-value object
  expect(response.body).toBeInstanceOf(Object);

  const allowed = ['message', 'data', 'fieldErrors', 'links'];
  const present = Object.keys(response.body);
  const extra = present.filter((key) => !allowed.includes(key));

  // body must have these keys, and no others
  expect(extra.length).toBe(0);

  // body must have at least one of these keys
  expect(present.length).toBeGreaterThan(0);

  // some type tightening
  if ('message' in response.body)
    expect(typeof response.body.message).toBe('string');
  if ('fieldErrors' in response.body)
    expect(response.body.fieldErrors).toBeInstanceOf(Object);
  if ('links' in response.body)
    expect(response.body.links).toBeInstanceOf(Object);
}
