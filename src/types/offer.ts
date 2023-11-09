import { Cities } from './city.js';
import { Coordinates } from './coordinates.js';
import { Facility } from './facility.js';
import { HousesType } from './houses-type.js';
import {UserType} from './user.js';

export type Offer = {
  name: string;
  description: string;
  publicationDate: Date;
  city: Cities;
  previewImage: string;
  images: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  housingType: HousesType;
  roomCount: number;
  guestCount: number;
  cost: number;
  facilities: Facility[];
  offerAuthor: UserType;
  commentsCount: number;
  coordinates: Coordinates
}
