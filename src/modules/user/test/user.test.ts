import 'reflect-metadata';
import { Mocked, afterAll, beforeAll, test } from 'vitest';

import { Server } from 'node:http';
import { AddressInfo } from 'node:net';

import { DocumentType } from '@typegoose/typegoose';
import express from 'express';
import CreateUserDto from '../dto/create-user.dto.js';
import { UserServiceInterface } from '../user-service.interface.js';
import { createUserContainer } from '../user.container.js';
import UserController from '../user.controller.js';
import { UserEntity } from '../user.entity.js';
import {LoggerInterface} from '../../../logger/logger.interface';
import {Component} from '../../../types/component.js';
import LoggerService from '../../../logger/logger.service';
import MockConfigService from '../../../config/mock.config.service';
import MockUserService from './mock.service';
import {UserTypeEnum} from '../../../types/user.js';

const container = createUserContainer();
container.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
container.bind(Component.ConfigInterface).toConstantValue(new MockConfigService({SALT: 'НеСыпьМнеСольНаРану'}));
container.rebind<UserServiceInterface>(Component.UserServiceInterface).to(MockUserService).inSingletonScope();

const app = express();
app.use(express.json());
app.use(container.get<UserController>(Component.UserController).router);

let server: Server;
beforeAll(() => {
  server = app.listen();
});

afterAll(() => {
  server.close();
});

test('POST /register', async (tc) => {
  const {port} = server.address() as AddressInfo;
  const url = new URL('/register', `http://0.0.0.0:${port}`);

  const srv = container.get<Mocked<UserServiceInterface>>(Component.UserServiceInterface);
  srv.create.mockImplementationOnce(async (dto) => new UserEntity(dto) as DocumentType<UserEntity>);

  const response = await fetch(url, {
    method: 'POST',
    headers: new Headers([['content-type', 'application/json']]),
    body: JSON.stringify({
      email: 'test@email.com',
      username: 'test',
      type: UserTypeEnum.Simple,
      password: 'password',
    } satisfies CreateUserDto)
  });

  const contentType = response.headers.get('content-type');

  tc.expect(response.ok).toBeTruthy();
  tc.expect(response.status).toBe(201); // created
  tc.expect(contentType?.startsWith('application/json')).toBeTruthy();

  const result = await response.json();

  tc.expect(result).toStrictEqual({
    email: 'test@email.com',
    username: 'test',
    type: UserTypeEnum.Simple,
  });
});

test.todo('POST /register');
