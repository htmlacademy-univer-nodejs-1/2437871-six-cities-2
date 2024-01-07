import { ConfigInterface } from './config.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {config} from 'dotenv';
import {configSchema, RestSchema} from './rest.schema.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.js';

@injectable()
export default class ConfigService implements ConfigInterface<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    const configOutput = config();

    if (configOutput.error) {
      throw new Error('Error reading the .env file');
    }

    configSchema.load({});
    configSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configSchema.getProperties();
    this.logger.info('.env file found successfully');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
