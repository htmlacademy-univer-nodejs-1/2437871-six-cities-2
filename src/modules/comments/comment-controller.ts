import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {OfferServiceInterface} from '../offer/offer-service.interface.js';
import {Controller} from '../../controller/controller.abstract.js';
import {Component} from '../../types/component.js';
import {LoggerInterface} from '../../logger/logger.interface.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import {HttpMethod} from '../../types/http.methods.js';
import {ValidateDtoMiddleware} from '../../middleware/validate-dto.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {DocumentExistsMiddleware} from '../../middleware/document-exists.js';
import {fillDTO} from '../../helpers/fillDTO.js';
import CommentRdo from './rdo/comment.rdo.js';


@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
  ) {
    super(logger);

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async create({body}: Request<object, object, CreateCommentDto>, res: Response): Promise<void> {
    const comment = await this.commentService.createForOffer(body);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
