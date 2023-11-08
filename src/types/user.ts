export enum UserType {
  Usual = 'usual',
  Pro = 'pro'
}

export type User = {
  name: string,
  email: string,
  avatarPath?: string,
  password: string,
  type: UserType
};
