import {injectable} from 'inversify';
import {Response, Router} from 'express';
import {StatusCodes} from 'http-status-codes';
import {LoggerInterface} from '../logger/logger.interface.js';
import {RouteInterface} from '../../types/route.js';
import {ControllerInterface} from './controller.interface.js';
import asyncHandler from 'express-async-handler';
import fullServerPath from '../helpers/full-server-path.js';
import transformObject from '../helpers/transform-object.js';
import {STATIC_RESOURCE_FIELDS} from '../helpers/constants.js';
import {ConfigInterface} from '../config/config.interface.js';
import {RestSchema} from '../config/rest.schema.js';

@injectable()
export abstract class Controller implements ControllerInterface {
  private readonly _router: Router;

  constructor(
        protected readonly logger: LoggerInterface,
        protected readonly configService: ConfigInterface<RestSchema>) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: RouteInterface) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map(
      (item) => asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  protected addStaticPath(data: Record<string, unknown>): void {
    const serverPath = fullServerPath(this.configService.get('HOST'), this.configService.get('PORT'));
    transformObject(
      STATIC_RESOURCE_FIELDS,
      `${serverPath}/${this.configService.get('STATIC_DIRECTORY_PATH')}`,
      `${serverPath}/${this.configService.get('UPLOAD_DIRECTORY')}`,
      data
    );
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    this.addStaticPath(data as Record<string, unknown>);
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
