import { City } from './city.js';
import { Coordinates } from './coordinates.js';
import { Facility } from './facility.js';
import { HousesType } from './houses-type.js';
import {User} from './user';

export type Offer = {
  title: string,
  description: string,
  publishDate: Date,
  city: City,
  previewImage: string,
  images: string[],
  isPremium: boolean,
  isFavourite: boolean,
  rating: number,
  housesType: HousesType,
  roomsNumber: number,
  guestsNumber: number,
  price: number,
  facilities: Facility[],
  offerAuthor: User,
  commentsCount: number,
  coordinates: Coordinates
}
