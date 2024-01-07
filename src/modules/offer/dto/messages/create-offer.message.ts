type messageType = 'name' | 'description' | 'city' | 'premium' | 'housingType'
    | 'roomCount' | 'guestCount' | 'cost' | 'facilities' | 'coordinates';

export const CreateOfferMessage: Record<messageType, string[]> = {
  name: ['Min length for name is 10',
    'Max length for name is 100'],
  description: ['Min length for description is 20', 'Max length for description is 1024'],
  city: ['type must be one of the city'],
  premium: [
    'field premium must be boolean'
  ],
  housingType: ['type must be one of the housing types.'],
  roomCount: ['Min count of rooms is 1.', 'Max count of rooms is 8'],
  guestCount: ['Min count of guests is 1.',
    'Max count of guests is 10.'],
  facilities: ['field facilities must be an array.',
    'type must be one of the facilities.',
    'There should be at least 1 facility'],
  cost: ['Min cost is 100.',
    'Max cost is 100000.'],
  coordinates: [
    'There should be object CoordinatesType',
  ]
};
