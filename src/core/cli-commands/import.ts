import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CommandInterface } from './commands.interface.js';
import createOffer from '../helpers/create-offer.js';
import chalk from 'chalk';
import {throwErrorMessage} from '../helpers/error.js';
import {UserServiceInterface} from '../../modules/user/user-service.interface';
import {OfferServiceInterface} from '../../modules/offer/offer-service.interface';
import {DatabaseClientInterface} from '../database-client/database-client.interface';
import {LoggerInterface} from '../logger/logger.interface';
import ConsoleLoggerService from '../logger/console.logger.service';
import OfferService from '../../modules/offer/offer.service';
import {OfferModel} from '../../modules/offer/offer.entity';
import UserService from '../../modules/user/user.service';
import {UserModel} from '../../modules/user/user.entity';
import MongoClientService from '../database-client/mongo-client.service';
import {Offer} from '../../types/offer.js';
import {DEFAULT_USER_PASSWORD, DEFAULT_DB_PORT} from '../helpers/constants.js';
import {connectionString} from '../helpers/connection-string/connection-string.js';

export default class ImportCommand implements CommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private readonly logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel, OfferModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.offerAuthor,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      userId: user.id,
    });
  }

  private async onLine(line: string, resolve: VoidFunction) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(`${count} rows imported`);
    this.databaseService.disconnect();
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename, login, password, host, dbname, salt] = parameters;
    const uri = connectionString(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseService.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('row', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      this.logger.error(`${chalk.redBright(`Не вышло прочитать файл. Ошибка: ${throwErrorMessage(err)}`)}`);
    }
  }
}
