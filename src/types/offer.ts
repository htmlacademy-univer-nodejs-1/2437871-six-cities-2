import { Cities } from './city.js';
import { Coordinates } from './coordinates.js';
import { Facility } from './facility.js';
import { HousesType } from './houses-type.js';
import {User} from './user.js';

export type Offer = {
  title: string,
  description: string,
  publishDate: Date,
  city: Cities,
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
