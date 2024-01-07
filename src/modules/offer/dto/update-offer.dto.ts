import {Cities} from '../../../types/city.js';
import {HousesType} from '../../../types/houses-type.js';
import {Facility} from '../../../types/facility.js';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject, IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {Coordinates} from '../../../types/coordinates.js';
import {UpdateOfferMessage} from './messages/update-offer.message.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: UpdateOfferMessage.name[0]})
  @MaxLength(100, {message: UpdateOfferMessage.name[1]})
  public name?: string;

  @IsOptional()
  @MinLength(20, {message: UpdateOfferMessage.description[0]})
  @MaxLength(1024, {message: UpdateOfferMessage.description[1]})
  public description?: string;

  @IsOptional()
  @IsEnum(Cities, {message: UpdateOfferMessage.city[0]})
  public city?: Cities;

  @IsOptional()
  @IsString({message: UpdateOfferMessage.previewImage[0]})
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: UpdateOfferMessage.images[0]})
  @IsString({each: true, message: UpdateOfferMessage.images[1]})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferMessage.premium[0]})
  public premium?: boolean;

  @IsOptional()
  @IsEnum(HousesType, {message: UpdateOfferMessage.housingType[0]})
  public housingType?: HousesType;

  @IsOptional()
  @Min(1, {message: UpdateOfferMessage.roomCount[0]})
  @Max(8, {message: UpdateOfferMessage.roomCount[1]})
  public roomCount?: number;

  @IsOptional()
  @Min(1, {message: UpdateOfferMessage.guestCount[0]})
  @Max(10, {message: UpdateOfferMessage.guestCount[1]})
  public guestCount?: number;

  @IsOptional()
  @Min(100, {message: UpdateOfferMessage.cost[0]})
  @Max(100000, {message: UpdateOfferMessage.cost[1]})
  public cost?: number;

  @IsOptional()
  @IsArray({message: UpdateOfferMessage.facilities[0]})
  @IsEnum(Facility, {each: true, message: UpdateOfferMessage.facilities[1]})
  @ArrayNotEmpty({message: UpdateOfferMessage.facilities[2]})
  public facilities?: Facility[];

  @IsOptional()
  @IsObject({message: UpdateOfferMessage.coordinates[0]})
  public coordinates?: Coordinates;
}
