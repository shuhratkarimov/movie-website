import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsNumber()
  age: number;

  @IsString()
  country: string;

  @IsEmail()
  email: string;
}
