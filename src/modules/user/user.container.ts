import {Container} from 'inversify';
import {UserServiceInterface} from './user-service.interface.js';
import UserService from './user.service.js';
import {types} from '@typegoose/typegoose';
import {Component} from '../../types/component.js';
import {UserEntity, UserModel} from './user.entity.js';
export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
