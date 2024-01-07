import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {UserServiceInterface} from '../user-service.interface.js';
import {HttpError} from '../../../http/http.errors.js';
import {StatusCodes} from 'http-status-codes';
import {ConfigInterface} from '../../../core/config/config.interface.js';
import {RestSchema} from '../../../core/config/rest.schema.js';
import UserRdo from '../rdo/user.rdo.js';
import LoginUserDto from '../dto/login-user.dto.js';
import CreateUserDto from '../dto/create-user.dto.js';
import {Controller} from '../../../core/controller/controller.abstract.js';
import {Component} from '../../../types/component.js';
import {LoggerInterface} from '../../../core/logger/logger.interface.js';
import {HttpMethod} from '../../../types/http.methods.js';
import {ValidateDtoMiddleware} from '../../../core/middleware/validate-dto.js';
import {fillDTO} from '../../../core/helpers/fill-DTO.js';
import {UploadFileMiddleware} from '../../../core/middleware/upload-file.js';
import {ValidateObjectIdMiddleware} from '../../../core/middleware/validate-objec-id.js';
import {PrivateRouteMiddleware} from '../../../core/middleware/private-route.js';
import LoggedUserRdo from '../rdo/logged-user.rdo.js';
import {JWT_ALGORITHM} from '../../../core/helpers/constants.js';
import {makeJwt} from '../../../core/helpers/make-jwt.js';
import UploadUserAvatarResponse from '../rdo/upload-user-avatar.rdo.js';
import {RequestBody, RequestParams} from '../../../http/requests.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;

@injectable()
export default class UserController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface,
                @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
                @inject(Component.ConfigInterface) protected readonly configService: ConfigInterface<RestSchema>
  ) {
    super(logger, configService);

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Post,
      handler: this.logout,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create({body}: CreateUserRequest, res: Response,): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(
      res,
      fillDTO(UserRdo, result)
    );
  }

  public async login({body}: LoginUserRequest, res: Response): Promise<void> {
    const user = await this
      .userService
      .verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController',
      );
    }

    const token = await makeJwt(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      {
        email: user.email,
        id: user.id
      }
    );
    this.ok(res,
      {
        ...fillDTO(LoggedUserRdo, user),
        token
      });
  }

  public async checkAuthenticate({user: {email}}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async logout(req: Request, res: Response): Promise<void> {
    const [, token] = String(req.headers.authorization?.split(' '));

    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.noContent(res, {token});
  }

  public async uploadAvatar(req: Request, res: Response) {
    const {userId} = req.params;
    const uploadFile = {avatar: req.file?.filename};
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarResponse, uploadFile));
  }
}
