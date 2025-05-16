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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  findOne(@Req() req: Request) {
    return this.userService.findOne(req);
  }

  @Put('/me')
  update(@Req() req: Request, @Body() dto: UpdateUserDto) {
    return this.userService.update(req, dto);
  }
}
