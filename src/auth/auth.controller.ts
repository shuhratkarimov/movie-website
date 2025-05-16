import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('auth') // Bu tag Swagger UI'da guruhlash uchun
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiResponse({ status: 201, description: 'Muvaffaqiyatli ro‘yxatdan o‘tkazildi' })
  @ApiBody({ type: CreateAuthDto })
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('/verify/:id')
  @ApiOperation({ summary: 'Email tasdiqlash kodi orqali tasdiqlash' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        code: { type: 'number', example: 123456, description: 'Tasdiqlash kodi' },
      },
      required: ['code'],
    },
  })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli tasdiqlash' })
  verify(@Param('id') id: string, @Body('code') code: number) {
    return this.authService.verify(code, id);
  }

  @Public()
  @Post('/login')
  @ApiOperation({ summary: 'Foydalanuvchi tizimga kirishi' })
  @ApiBody({ type: UpdateAuthDto })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli kirish va token' })
  login(@Body() updateAuthDto: UpdateAuthDto, @Res() res: Response) {
    return this.authService.login(updateAuthDto, res);
  }

  @Public()
  @Post('/resend-code')
  @ApiOperation({ summary: 'Tasdiqlash kodini qayta yuborish' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com', description: 'Foydalanuvchi emaili' },
      },
      required: ['email'],
    },
  })
  @ApiResponse({ status: 200, description: 'Kod qayta yuborildi' })
  resendCode(@Body('email') email: string) {
    return this.authService.resendCode(email);
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Parolni unutgan foydalanuvchi uchun kod yuborish' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com', description: 'Foydalanuvchi emaili' },
      },
      required: ['email'],
    },
  })
  @ApiResponse({ status: 200, description: 'Qayta tiklash kodi yuborildi' })
  forgot(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Parolni qayta tiklash' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'john@example.com', description: 'Foydalanuvchi emaili' },
        code: { type: 'number', example: 123456, description: 'Qayta tiklash kodi' },
        newPassword: { type: 'string', example: 'newSecret123', description: 'Yangi parol' },
      },
      required: ['email', 'code', 'newPassword'],
    },
  })
  @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli tiklandi' })
  resetPassword(
    @Body('email') email: string,
    @Body('code') code: number,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, code, newPassword);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Tizimdan chiqish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli chiqish' })
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
