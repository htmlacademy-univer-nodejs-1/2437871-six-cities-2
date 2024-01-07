import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from '../../offer/offer-service.interface.js';
import {Controller} from '../../../core/controller/controller.abstract.js';
import {Component} from '../../../types/component.js';
import {LoggerInterface} from '../../../core/logger/logger.interface.js';
import {CommentServiceInterface} from '../comment-service.interface.js';
import {HttpMethod} from '../../../types/http.methods.js';
import {ValidateDtoMiddleware} from '../../../core/middleware/validate-dto.js';
import CreateCommentDto from '../dto/create-comment.dto.js';
import {DocumentExistsMiddleware} from '../../../core/middleware/document-exists.js';
import {fillDTO} from '../../../core/helpers/fill-DTO.js';
import CommentRdo from '../rdo/comment.rdo.js';
import {PrivateRouteMiddleware} from '../../../core/middleware/private-route.js';
import {ParamsOffer} from '../../../types/params.js';
import {RestSchema} from '../../../core/config/rest.schema.js';
import {ConfigInterface} from '../../../core/config/config.interface.js';


@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index({params}: Request<ParamsOffer>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create({body, params, user}: Request<ParamsOffer>, res: Response): Promise<void> {
    const comment = await this.commentService.createForOffer(
      {
        ...body, offerId:
                params.offerId, userId:
                user.id
      }
    );
    const result = await this.commentService.findById(comment.id);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
