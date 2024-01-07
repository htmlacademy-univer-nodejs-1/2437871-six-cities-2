import {UserTypeEnum} from '../../../types/user.js';
import {IsEmail, IsEnum, IsString, Length} from 'class-validator';
import {CreateUserMessage} from './messages/creata-user.message.js';

export default class CreateUserDto {
  @IsEmail({}, {message: CreateUserMessage.email[0]})
  @IsString({message: CreateUserMessage.email[1]})
  public email!: string;

  @Length(1, 15, {message: CreateUserMessage.name[0]})
  @IsString({message: CreateUserMessage.name[1]})
  public username!: string;

  @IsEnum(UserTypeEnum, {message: CreateUserMessage.type[0]})
  public type!: UserTypeEnum;

  @Length(6, 12, {message: CreateUserMessage.password[0]})
  @IsString({message: CreateUserMessage.password[1]})
  public password!: string;
}
