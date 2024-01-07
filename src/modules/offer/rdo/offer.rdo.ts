import {Expose, Type} from 'class-transformer';
import {Cities} from '../../../types/city.js';
import {HousesType} from '../../../types/houses-type.js';
import {UserEntity} from '../../user/user.entity.js';
import {Coordinates} from '../../../types/coordinates.js';
import UserRdo from '../../user/rdo/user.rdo.js';
import {Facility} from '../../../types/facility.js';

export class OfferRdo {
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
    images!: string[];

  @Expose()
    premium!: boolean;

  @Expose()
    favorite!: boolean;

  @Expose()
    rating!: number;

  @Expose()
    housingType!: HousesType;

  @Expose()
    cost!: number;

  @Expose()
    commentsCount!: number;

  @Expose()
    roomCount!: number;

  @Expose()
    guestCount!: number;

  @Expose()
    facilities!: Facility[];

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
    offerAuthor!: UserEntity;

  @Expose()
    coordinates!: Coordinates;
}
