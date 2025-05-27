import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Admin } from './admin.schema';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post('/createUser')
  async createUser(@Body() dto: CreateUserDto): Promise<{ message: string; admin: Admin }> {
    return this.adminService.createUser(dto);
  }
  @Get('/getAllUser')
  async getAllUser(): Promise<{ message: string; admin: Admin[] }> {
    return this.adminService.getAllUser();
  }
  @Get('/getOne/:email')
  async getOneUser(@Param('email') email: string): Promise<{ message: string; admin: Admin }> {
    return this.adminService.getOneUser(email);
  }
  @Put('/editUser/:email')
  async editUser(
    @Param('email') email: string,
    @Body() dto: UpdateUserDto,
  ): Promise<{ message: string; admin: Admin }> {
    return this.adminService.editUser(email, dto);
  }
  @Delete('/deleteUser/:email')
  async deleteUser(@Param('email') email: string): Promise<{ message: string }> {
    return this.adminService.deleteUser(email);
  }
}
