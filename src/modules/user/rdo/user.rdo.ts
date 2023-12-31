import {Expose} from 'class-transformer';
import {UserType} from '../../../types/user.js';

export default class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public username!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public type!:UserType;
}
