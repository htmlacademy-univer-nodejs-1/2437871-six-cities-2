import assert from 'node:assert';
import { Headers, fetch } from 'undici';
import { describe, test } from 'vitest';
import {Cities} from '../../src/types/city.js';
import {HousesType} from '../../src/types/houses-type.js';
import {Facility} from '../../src/types/facility.js';
import UserRdo from '../../src/modules/user/rdo/user.rdo.js';
import LoggedUserRdo from '../../src/modules/user/rdo/logged-user.rdo.js';

process.env['E2E_ENDPOINT'] = 'http://localhost:4000';
assert(process.env['E2E_ENDPOINT'] !== undefined);
assert(process.env['E2E_ENDPOINT'].startsWith('http') === true, 'E2E_ENDPOINT should start with the protocol');

const url = new URL(process.env['E2E_ENDPOINT']);

describe('POST /offers', async () => {
  test('Success offers create', async (tc) => {
    const email = 'test@gmail.com';
    const password = '12345678910';

    const offer = {
      name: 'nametenlenght',
      description: 'descriptiontwentylenght',
      city: Cities.Cologne,
      premium: true,
      housingType: HousesType.Hotel,
      roomCount: 1,
      guestCount: 2,
      cost: 10000,
      facilities: [Facility.AirConditioning],
      userId: '',
      coordinates: {latitude: 2.22222, longitude: 3.444444}
    };

    const user = {
      email,
      password,
    };

    const registerResponse = await fetch(new URL('/users/register', url), {
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

    const userRdo = await registerResponse.json() as unknown as UserRdo;
    const loginResponse = await fetch(new URL('/users/login', url), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(user)
    });

    const content: LoggedUserRdo = await loginResponse.json() as unknown as LoggedUserRdo;
    const response = await fetch(new URL('/offers', url), {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        'Authorization': `Bearer ${content.token}`
      }),
      body: JSON.stringify({...offer, userId: userRdo.id})
    });

    tc.expect(response.ok).toBeTruthy();
    tc.expect(response.status).toStrictEqual(201);
    tc.expect(response.headers.get('content-type')).toMatch(/application\/json/);
    tc.expect(await response.json()).toMatchSnapshot();
  });
});
