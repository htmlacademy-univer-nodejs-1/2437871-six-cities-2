import * as jose from 'jose';
import * as crypto from 'node:crypto';

export async function makeJwt(algorithm: string, jwtSecret: string, payload: object): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('6m')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}
