import {UserTypeEnum} from '../../../types/user.js';

export default class CreateUserDto {
  public email!: string;
  public avatar?: string;
  public username!: string;
  public type!: UserTypeEnum;
  public password!: string;
}
