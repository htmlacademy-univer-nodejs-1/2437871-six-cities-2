import 'reflect-metadata';
import {LoggerInterface} from '../logger/logger.interface.js';
import {ConfigInterface} from '../config/config.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.js';
import {ConfigSchema} from '../config/config.schema.js';


@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface<ConfigSchema>,
  ) {}

  public async init() {
    this.logger.info('Приложение инициализировано');
    this.logger.info(`PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST: ${this.config.get('DB_HOST')}`);
    this.logger.info(`SALT: ${this.config.get('SALT')}`);
  }
}
