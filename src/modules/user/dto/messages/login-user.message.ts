type messageType = 'email' | 'password';

export const LoginUserMessage: Record<messageType, string> = {
  email: 'Email must be valid.',
  password: 'Password is required.'
};
