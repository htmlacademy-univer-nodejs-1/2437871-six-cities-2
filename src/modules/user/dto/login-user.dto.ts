import {IsEmail, IsString} from 'class-validator';
import {LoginUserMessage} from './messages/login-user.message.js';

export default class LoginUserDto {
  @IsEmail({}, {message: LoginUserMessage.email})
  public email!: string;

  @IsString({message: LoginUserMessage.password})
  public password!: string;
}
