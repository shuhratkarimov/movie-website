import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  movieId: string;

  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
