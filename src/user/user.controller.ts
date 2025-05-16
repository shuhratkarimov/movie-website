import {
  Controller,
  Get,
  Body,
  Req,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hozirgi foydalanuvchini olish' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi maʼlumotlari muvaffaqiyatli olindi',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        fullName: 'John Doe',
        email: 'john@example.com',
        // boshqa foydalanuvchi maydonlari
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token yaroqsiz yoki mavjud emas' })
  @Get('/me')
  findOne(@Req() req: Request) {
    return this.userService.findOne(req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hozirgi foydalanuvchi maʼlumotlarini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli yangilandi',
    schema: {
      example: { message: 'User updated successfully' },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token yaroqsiz yoki mavjud emas' })
  @Put('/me')
  update(@Req() req: Request, @Body() dto: UpdateUserDto) {
    return this.userService.update(req, dto);
  }
}
