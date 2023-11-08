import 'reflect-metadata';
import LoggerService from './logger/logger.service.js';
import {LoggerInterface} from './logger/logger.interface.js';
import {ConfigInterface} from './config/config.interface.js';
import {ConfigSchema} from './config/config.schema.js';
import ConfigService from './config/config.service.js';
import {Component} from './types/component.js';
import Application from './app/application.js';
import {Container} from 'inversify';


const container = new Container();
container.bind<Application>(Component.Application).to(Application).inSingletonScope();
container.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
container.bind<ConfigInterface<ConfigSchema>>(Component.ConfigInterface).to(ConfigService).inSingletonScope();

const application = container.get<Application>(Component.Application);
await application.init();
