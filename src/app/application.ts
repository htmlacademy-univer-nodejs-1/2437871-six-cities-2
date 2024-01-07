import 'reflect-metadata';
import {LoggerInterface} from '../core/logger/logger.interface.js';
import {ConfigInterface} from '../core/config/config.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../types/component.js';
import {RestSchema} from '../core/config/rest.schema.js';
import {DatabaseClientInterface} from '../core/database-client/database-client.interface.js';
import {connectionString} from '../core/helpers/connection-string/connection-string.js';
import express, { Express } from 'express';
import {ControllerInterface} from '../core/controller/controller.interface.js';
import {ExceptionFilter} from '../http/exception-fliter.interface.js';
import {AuthenticateMiddleware} from '../core/middleware/authenticate.js';

@injectable()
export default class Application {
  private expressApplication: Express;
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(Component.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(Component.UserController) private readonly userController: ControllerInterface,
    @inject(Component.OfferController) private readonly offerController: ControllerInterface,
    @inject(Component.CommentController) private readonly commentController: ControllerInterface,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
  ) {
    this.expressApplication = express();
  }

  private async _initMiddleware() {
    this.expressApplication.use(express.json());
    this.expressApplication.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.expressApplication.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );
    const authMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApplication.use(authMiddleware.execute.bind(authMiddleware));
  }

  private async _initDb() {
    const mongoUri = connectionString(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.expressApplication.listen(port);
  }

  private async _initRoutes() {
    this.expressApplication.use('/users', this.userController.router);
    this.expressApplication.use('/offers', this.offerController.router);
    this.expressApplication.use('/comments', this.commentController.router);
  }

  private async _initExceptionFilters() {
    this.expressApplication.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');

    this.logger.info('Init database');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init middlewares');
    await this._initMiddleware();
    this.logger.info('Middlewares initialization completed');

    this.logger.info('Init routes');
    await this._initRoutes();
    this.logger.info('Routes initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
