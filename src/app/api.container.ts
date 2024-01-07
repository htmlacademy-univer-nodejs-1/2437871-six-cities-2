import {Container} from 'inversify';
import {LoggerInterface} from '../core/logger/logger.interface.js';
import {ConfigInterface} from '../core/config/config.interface.js';
import {DatabaseClientInterface} from '../core/database-client/database-client.interface.js';
import {RestSchema} from '../core/config/rest.schema.js';
import {Component} from '../types/component.js';
import Application from './application.js';
import LoggerService from '../core/logger/logger.service.js';
import ConfigService from '../core/config/config.service.js';
import {ExceptionFilter} from '../http/exception-fliter.interface.js';
import AppExceptionFilter from '../http/app-exception-filter.js';
import MongoClientService from '../core/database-client/mongo-client.service.js';

export function createApplicationContainer() {
  const applicationContainer = new Container();
  applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
  applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
  applicationContainer.bind<ConfigInterface<RestSchema>>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
  applicationContainer.bind<DatabaseClientInterface>(Component.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  applicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();

  return applicationContainer;
}
