import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Foydalanuvchi nomi',
    type: String,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email manzili',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'mySecret123',
    description: 'Foydalanuvchi paroli',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    example: 123456,
    description: 'Email orqali yuborilgan tasdiqlash kodi (majburiy emas)',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  verification_code?: number;
}
