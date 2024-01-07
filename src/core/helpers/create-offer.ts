import {Offer} from '../../types/offer.js';
import {Cities} from '../../types/city.js';
import {HousesType} from '../../types/houses-type.js';
import {Facility} from '../../types/facility.js';
import {UserTypeEnum} from '../../types/user.js';

const createOffer = (offer: string): Offer => {
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
    commentsCount,
    latitude,
    longitude] = offerRow;

  const offerAuthor = {
    username: offerAuthorName,
    avatar: offerAuthorAvatar,
    type: offerAuthorType as unknown as UserTypeEnum,
    email: offerAuthorEmail
  };

  return {
    name,
    description,
    publicationDate: new Date(publicationDate),
    city: city as unknown as Cities,
    previewImage,
    images: images.split(','),
    premium: premium as unknown as boolean,
    favorite: favorite as unknown as boolean,
    rating: parseFloat(rating),
    housingType: housingType as unknown as HousesType,
    roomCount: parseInt(roomCount, 10),
    guestCount: parseInt(guestCount, 10),
    cost: parseInt(cost, 10),
    facilities: facilities.split(',').map((x) => x as unknown as Facility),
    offerAuthor,
    commentsCount: parseInt(commentsCount, 10),
    coordinates: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
  };
};

export default createOffer;
