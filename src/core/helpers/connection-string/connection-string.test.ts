import {connectionString} from './connection-string.js';
import { describe, test } from 'vitest';

describe('connectionString', () => {
  test('should correctly form the connection string', (ts) => {
    const username = 'testUser';
    const password = 'testPassword';
    const host = 'localhost';
    const port = '27017';
    const dbName = 'testDb';

    const result = connectionString(username, password, host, port, dbName);

    ts.expect(result).toEqual('mongodb://testUser:testPassword@localhost:27017/testDb?authSource=admin');
  });
});
