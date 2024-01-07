import {inject, injectable} from 'inversify';
import mongoose, {Mongoose} from 'mongoose';
import {setTimeout} from 'node:timers/promises';
import {DatabaseClientInterface} from './database-client.interface.js';
import {LoggerInterface} from '../logger/logger.interface.js';
import {Component} from '../../types/component.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface
  ) {
  }

  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.error(`Error connecting to the database. Attempt ${attempt}`);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    this.logger.error(`The connection to the database could not be established. Error: ${attempt}`);
    throw new Error('Error connecting to the database');
  }

  private async _connect(uri: string): Promise<void> {
    this.mongooseInstance = await this._connectWithRetry(uri);
    this.isConnected = true;
  }

  private async _disconnect(): Promise<void> {
    await this.mongooseInstance?.disconnect();
    this.isConnected = false;
    this.mongooseInstance = null;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client has already been initialized');
    }

    this.logger.info('Trying to connect to MongoDB');
    await this._connect(uri);
    this.logger.info('Connection to MongoDB is established');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('There is no connection to the database');
    }

    await this._disconnect();
    this.logger.info('The connection to the database is closed');
  }
}
