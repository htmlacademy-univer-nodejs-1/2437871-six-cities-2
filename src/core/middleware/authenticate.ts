import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from 'jose';
import { StatusCodes } from 'http-status-codes';
import { createSecretKey } from 'node:crypto';
import { MiddlewareInterface } from './middleware.interface.js';
import {HttpError} from '../../http/http.errors.js';

export class AuthenticateMiddleware implements MiddlewareInterface {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeaders = req.headers?.authorization?.split(' ');
    if (!authorizationHeaders) {
      return next();
    }

    const [, token] = authorizationHeaders;

    try {
      const { payload } = await jwtVerify(token,
        createSecretKey(this.jwtSecret, 'utf-8')
      );

      req.user = { email: payload.email as string, id: payload.id as string };
      return next();
    } catch {

      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware')
      );
    }
  }
}
