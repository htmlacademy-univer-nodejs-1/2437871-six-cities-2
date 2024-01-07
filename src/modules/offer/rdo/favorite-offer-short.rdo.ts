import { Expose } from 'class-transformer';
import {Cities} from '../../../types/city.js';
import {HousesType} from '../../../types/houses-type.js';

export class FavoriteOfferShortRdo {
  @Expose()
  public id!: string;

  @Expose()
    name!: string;

  @Expose({ name: 'createdAt'})
    publicationDate!: Date;

  @Expose()
    description!: string;

  @Expose()
    city!: Cities;

  @Expose()
    previewImage!: string;

  @Expose()
    premium!: boolean;

  favorite = true;

  @Expose()
    rating!: number;

  @Expose()
    housingType!: HousesType;

  @Expose()
    cost!: number;

  @Expose()
    commentsCount!: number;
}
