import {Cities} from '../../../types/city.js';
import {HousesType} from '../../../types/houses-type.js';
import {Facility} from '../../../types/facility.js';
import {Coordinates} from '../../../types/coordinates.js';
export class UpdateOfferDto {
  public name!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: Cities;
  public previewImage!: string;
  public images!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rating!: number;
  public housingType!: HousesType;
  public roomCount!: number;
  public guestCount!: number;
  public cost!: number;
  public facilities!: Facility[];
  public userId!: string;
  public commentsCount!: number;
  public coordinates!: Coordinates;
}
