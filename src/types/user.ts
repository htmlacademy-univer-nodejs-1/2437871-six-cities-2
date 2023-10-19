export enum UserType {
  Usual,
  Pro
}

export type User = {
  name: string,
  email: string,
  avatarPath?: string,
  password: string,
  type: UserType
};
