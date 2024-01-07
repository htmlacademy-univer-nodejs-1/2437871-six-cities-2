import {Cities} from '../../../types/city.js';
import {HousesType} from '../../../types/houses-type.js';
import {Facility} from '../../../types/facility.js';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {Coordinates} from '../../../types/coordinates.js';
import {CreateOfferMessage} from './messages/create-offer.message.js';


export default class CreateOfferDto {
  @MinLength(10, {message: CreateOfferMessage.name[0]})
  @MaxLength(100, {message: CreateOfferMessage.name[1]})
  public name!: string;

  @MinLength(20, {message: CreateOfferMessage.description[0]})
  @MaxLength(1024, {message: CreateOfferMessage.description[1]})
  public description!: string;

  @IsEnum(Cities, {message: CreateOfferMessage.city[0]})
  public city!: Cities;

  @IsBoolean({message: CreateOfferMessage.premium[0]})
  public premium!: boolean;

  @IsEnum(HousesType, {message: CreateOfferMessage.housingType[0]})
  public housingType!: HousesType;

  @Min(1, {message: CreateOfferMessage.roomCount[0]})
  @Max(8, {message: CreateOfferMessage.roomCount[1]})
  public roomCount!: number;

  @Min(1, {message: CreateOfferMessage.guestCount[0]})
  @Max(10, {message: CreateOfferMessage.guestCount[1]})
  public guestCount!: number;

  @Min(100, {message: CreateOfferMessage.cost[0]})
  @Max(100000, {message: CreateOfferMessage.cost[1]})
  public cost!: number;

  @IsArray({message: CreateOfferMessage.facilities[0]})
  @IsEnum(Facility, {each: true, message: CreateOfferMessage.facilities[1]})
  @ArrayNotEmpty({message: CreateOfferMessage.facilities[2]})
  public facilities!: Facility[];

  public userId!: string;

  @IsObject({message: CreateOfferMessage.coordinates[0]})
  public coordinates!: Coordinates;
}
