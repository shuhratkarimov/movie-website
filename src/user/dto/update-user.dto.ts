import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John Doe Updated',
    description: 'Foydalanuvchi toʻliq ismi',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    example: 'oldPassword123',
    description: 'Eski parol (yangilash uchun kerak)',
  })
  @IsOptional()
  @IsString()
  old_password?: string;

  @ApiPropertyOptional({
    example: 'newPassword456',
    description: 'Yangi parol (yangilash uchun kerak)',
  })
  @IsOptional()
  @IsString()
  new_password?: string;
}
