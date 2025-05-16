import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Foydalanuvchi nomi',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'oldSecret123',
    description: 'Eski parol',
  })
  @IsString()
  old_password: string;

  @ApiProperty({
    example: 'newSecret456',
    description: 'Yangi parol',
  })
  @IsString()
  new_password: string;
}
