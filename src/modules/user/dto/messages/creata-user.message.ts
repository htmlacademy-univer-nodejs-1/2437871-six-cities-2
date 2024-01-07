type messageType = 'email' | 'name' | 'type' | 'password';

export const CreateUserMessage: Record<messageType, string[]> = {
  email: [
    'Email must be valid.',
    'Email is required.'
  ],
  name: ['Username length should be from 1 to 15.',
    'Username is required.'],
  type: ['type must be one of the user type'],
  password: ['Password length should be from 6 to 12.',
    'Password is required.'],
};
