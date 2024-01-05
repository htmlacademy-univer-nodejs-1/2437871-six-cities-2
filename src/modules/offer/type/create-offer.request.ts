import { Request } from 'express';
import CreateOfferDto from '../dto/create-offer.dto.js';
import {RequestBody, RequestParams} from '../../../http/requests.js';


export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
