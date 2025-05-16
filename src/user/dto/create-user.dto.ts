import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Foydalanuvchi nomi',
  })
  @IsString()
  fullName: string;

  @IsString()
  old_password: string;

    @IsString()
  new_password: string;
}
