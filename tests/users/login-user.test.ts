import assert from 'node:assert';
import { Headers, fetch } from 'undici';
import { describe, test } from 'vitest';

process.env['E2E_ENDPOINT'] = 'http://localhost:4000';
assert(process.env['E2E_ENDPOINT'] !== undefined);
assert(process.env['E2E_ENDPOINT'].startsWith('http') === true, 'E2E_ENDPOINT should start with the protocol');

const url = new URL(process.env['E2E_ENDPOINT']);

describe('POST /users/login', async () => {
  test('Success user login', async (tc) => {
    const email = 'test@gmail.com';
    const password = '12345678910';

    const user = {
      email,
      password,
    };

    await fetch(new URL('/users/register', url), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({
        type: 'simple',
        email,
        username: 'name',
        password,
      })
    });

    const response = await fetch(new URL('/users/login', url), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(user)
    });

    tc.expect(response.ok).toBeTruthy();
    tc.expect(response.status).toStrictEqual(200);
    tc.expect(response.headers.get('content-type')).toMatch(/application\/json/);
    tc.expect(await response.json()).toMatchSnapshot();
  });

  test('Invalid password or email', async (tc) => {
    const email = 'test@gmail.com';
    const password = 'ivalide';

    const user = {
      email,
      password,
    };

    const response = await fetch(new URL('/users/login', url), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(user)
    });

    tc.expect(response.ok).toBeFalsy();
    tc.expect(response.status).toStrictEqual(401);
    tc.expect(response.statusText).toStrictEqual('Unauthorized');
    tc.expect(response.headers.get('content-type')).toMatch(/application\/json/);
    tc.expect(await response.json()).toMatchSnapshot();
  });
});
