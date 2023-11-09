export enum UserTypeEnum {
  Simple = 'simple',
  Pro = 'pro'
}

export type UserType = {
  username: string,
  email: string,
  avatar?: string,
  type: UserTypeEnum,
};
