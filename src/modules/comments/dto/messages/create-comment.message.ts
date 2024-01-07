type messageType = 'text' | 'rating';
export const CreateCommentMessage: Record<messageType, string[]> = {
  text: ['Text is required.',
    'Min length is 5, max is 1024.'],
  rating: ['Min value for rating is 1.', 'Max value for rating is 5.'],
};
