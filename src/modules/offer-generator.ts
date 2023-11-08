import {generateRandomValue, getRandomItem, getRandomItems} from '../helpers/random.js';
import {MockData} from '../types/mock-data.type';
import {OfferGeneratorInterface} from './offer-generator.interface.js';
import dayjs from 'dayjs';
import {Cities} from '../types/city.js';
import {HousesType} from '../types/houses-type.js';
import {Facility} from '../types/facility.js';
import {UserType} from '../types/user.js';

const MIN_COST = 100;
const MAX_COST = 100000;
const MIN_RATING = 1;
const MAX_RATING = 5;
const MIN_COUNT = 1;
const MAX_COUNT = 10;
const MIN_COUNT_ROOM = 1;
const MAX_COUNT_ROOM = 8;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {
  }

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem([Cities.Amsterdam, Cities.Cologne, Cities.Brussels, Cities.Paris, Cities.Hamburg, Cities.Dusseldorf]);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images);
    const premium = getRandomItem<string>(['true', 'false']);
    const favorite = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1);
    const housingType = getRandomItem([HousesType.House, HousesType.Hotel, HousesType.Room, HousesType.Apartment]);
    const roomCount = generateRandomValue(MIN_COUNT_ROOM, MAX_COUNT_ROOM);
    const guestCount = generateRandomValue(MIN_COUNT, MAX_COUNT);
    const cost = generateRandomValue(MIN_COST, MAX_COST);
    const facilities = getRandomItems([Facility.AirConditioning, Facility.BabySeat, Facility.Fridge]);
    const offerAuthorName = getRandomItem<string>(this.mockData.users.usernames);
    const offerAuthorAvatar = getRandomItem<string>(this.mockData.users.avatars);
    const offerAuthorType = getRandomItem([UserType.Pro, UserType.Usual]);
    const offerAuthorNameEmail = getRandomItem<string>(this.mockData.users.emails);
    const offerAuthorNamePassword = getRandomItem<string>(this.mockData.users.passwords);
    const commentsCount = generateRandomValue(MIN_COUNT, MAX_COUNT);
    const latitude = getRandomItem<number>(this.mockData.coordinates.latitude);
    const longitude = getRandomItem<number>(this.mockData.coordinates.longitude);

    return [
      name, description, publicationDate,
      city, previewImage, images, premium,
      favorite, rating, housingType, roomCount,
      guestCount, cost, facilities, offerAuthorName,
      offerAuthorAvatar, offerAuthorType, offerAuthorNameEmail,
      offerAuthorNamePassword, commentsCount, latitude, longitude
    ].join('\t');
  }
}
