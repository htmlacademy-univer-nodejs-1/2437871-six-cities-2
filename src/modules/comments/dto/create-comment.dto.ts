import {IsString, Length, Max, Min} from 'class-validator';
import {CreateCommentMessage} from './messages/create-comment.message.js';

export default class CreateCommentDto {
  @IsString({message: CreateCommentMessage.text[0]})
  @Length(5, 1024, {message: CreateCommentMessage.text[1]})
  public text!: string;

  public offerId!: string;

  public userId!: string;

  @Min(1, {message: CreateCommentMessage.rating[0]})
  @Max(5, {message: CreateCommentMessage.rating[1]})
  public rating!: number;
}
