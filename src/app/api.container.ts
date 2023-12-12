import {Container} from 'inversify';
import {LoggerInterface} from '../logger/logger.interface.js';
import {ConfigInterface} from '../config/config.interface.js';
import {DatabaseClientInterface} from '../database-client/database-client.interface.js';
import {ConfigSchema} from '../config/config.schema.js';
import {Component} from '../types/component.js';
import Application from './application.js';
import LoggerService from '../logger/logger.service.js';
import ConfigService from '../config/config.service.js';
import {ExceptionFilter} from '../http/exception-fliter.interface.js';
import AppExceptionFilter from '../http/app-exception-filter.js';
import MongoClientService from '../database-client/mongo-client.service.js';

export function createApplicationContainer() {
  const applicationContainer = new Container();
  applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
  applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
  applicationContainer.bind<ConfigInterface<ConfigSchema>>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
  applicationContainer.bind<DatabaseClientInterface>(Component.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  applicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return applicationContainer;
}
