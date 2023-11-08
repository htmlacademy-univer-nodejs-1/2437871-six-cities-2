import {Offer} from '../types/offer.js';
import {Cities} from '../types/city.js';
import {HousesType} from '../types/houses-type.js';
import {Facility} from '../types/facility.js';
import {UserType} from '../types/user.js';
export function createOffer(offer: string): Offer {
  const offerRow = offer.replace('\n', '').split('\t');
  const [name,
    description,
    publicationDate,
    city,
    previewImage,
    images,
    premium,
    favorite,
    rating,
    housingType,
    roomCount,
    guestCount,
    cost,
    facilities,
    offerAuthorName,
    offerAuthorAvatar,
    offerAuthorType,
    offerAuthorEmail,
    offerAuthorPassword,
    commentsCount,
    latitude,
    longitude] = offerRow;
  return {
    title: name,
    description: description,
    publishDate: new Date(publicationDate),
    city: city as unknown as Cities,
    previewImage: previewImage,
    images: images.split(','),
    isPremium: premium as unknown as boolean,
    isFavourite: favorite as unknown as boolean,
    rating: parseFloat(rating),
    housesType: housingType as unknown as HousesType,
    roomsNumber: parseInt(roomCount, 10),
    guestsNumber: parseInt(guestCount, 10),
    price: parseInt(cost, 10),
    facilities: facilities.split(',').map((x) => x as unknown as Facility),
    offerAuthor: {
      name: offerAuthorName,
      avatarPath: offerAuthorAvatar,
      type: offerAuthorType as unknown as UserType,
      email: offerAuthorEmail,
      password: offerAuthorPassword
    },
    commentsCount: parseInt(commentsCount, 10),
    coordinates: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
  };
}
