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
import e, { Response } from 'express';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Public()
  @Post('/verify/:id')
  verify(@Param('id') id: string, @Body('code') code: number) {
    return this.authService.verify(code, id);
  }

  @Public()
  @Post('/login')
  login(@Body() updateAuthDto: UpdateAuthDto, @Res() res: Response) {
    return this.authService.login(updateAuthDto, res);
  }

  @Public()
  @Post('/resend-code')
  resendCode(@Body('email') email: string) {
    return this.authService.resendCode(email);
  }
  
  @Public()
  @Post('forgot-password')
  forgot(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Public()
  @Post('reset-password')
  resetPassword(
    @Body('email') email: string,
    @Body('code') code: number,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, code, newPassword);
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
