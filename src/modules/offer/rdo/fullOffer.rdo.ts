import { Expose } from 'class-transformer';
import {Cities} from '../../../types/city.js';
import {HousesType} from '../../../types/houses-type.js';
import {Facility} from '../../../types/facility.js';
import {UserType} from '../../../types/user.js';
import {Coordinates} from '../../../types/coordinates.js';

export class FullOfferRdo {
  @Expose()
    name!: string;

  @Expose()
    description!: string;

  @Expose()
    publicationDate!: Date;

  @Expose()
    city!: Cities;

  @Expose()
    previewImage!: string;

  @Expose()
    images!: string[];

  @Expose()
    premium!: boolean;

  @Expose()
    favorite = true;

  @Expose()
    rating!: number;

  @Expose()
    housingType!: HousesType;

  @Expose()
    roomCount!: number;

  @Expose()
    guestCount!: number;

  @Expose()
    cost!: number;

  @Expose()
    facilities!: Facility[];

  @Expose()
    offerAuthor!: UserType;

  @Expose()
    commentsCount!: number;

  @Expose()
    coordinates!: Coordinates;
}
