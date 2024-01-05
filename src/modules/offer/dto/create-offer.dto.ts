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


export default class CreateOfferDto {
  @MinLength(10, {message: 'Min length for name is 10'})
  @MaxLength(100, {message: 'Max length for name is 100'})
  public name!: string;

  @MinLength(20, {message: 'Min length for description is 20'})
  @MaxLength(1024, {message: 'Max length for description is 1024'})
  public description!: string;

  @IsEnum(Cities, {message: 'type must be one of the city'})
  public city!: Cities;

  @IsBoolean({message: 'field premium must be boolean'})
  public premium!: boolean;

  @IsEnum(HousesType, {message: 'type must be one of the housing types'})
  public housingType!: HousesType;

  @Min(1, {message: 'Min count of rooms is 1'})
  @Max(8, {message: 'Max count of rooms is 8'})
  public roomCount!: number;

  @Min(1, {message: 'Min count of guests is 1'})
  @Max(10, {message: 'Max count of guests is 10'})
  public guestCount!: number;

  @Min(100, {message: 'Min cost is 100'})
  @Max(100000, {message: 'Max cost is 100000'})
  public cost!: number;

  @IsArray({message: 'field facilities must be an array'})
  @IsEnum(Facility, {each: true, message: 'type must be one of the facilities'})
  @ArrayNotEmpty({message: 'There should be at least 1 facility'})
  public facilities!: Facility[];

  public userId!: string;

  @IsObject({message: 'There should be object CoordinatesType'})
  public coordinates!: Coordinates;
}
