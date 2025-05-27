import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './admin.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminSchema: Model<Admin>) {}
  async createUser(dto: CreateUserDto): Promise<{ message: string; admin: Admin }> {
    try {
      const findUser = await this.adminSchema.findOne({ email: dto.email });
      if (findUser) {
        throw new ConflictException('user already exists');
      }
      const createUser = await this.adminSchema.create(dto);
      return { message: 'succes create', admin: createUser };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async getAllUser(): Promise<{ message: string; admin: Admin[] }> {
    try {
      const findUser = await this.adminSchema.find();
      if (!findUser) {
        throw new NotFoundException('user not found');
      }
      return { message: 'all users', admin: findUser };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async getOneUser(email: string): Promise<{ message: string; admin: Admin }> {
    try {
      const findUser = await this.adminSchema.findOne({ email });
      if (!findUser) {
        throw new NotFoundException('user not found');
      }
      return { message: 'one user', admin: findUser };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async editUser(email: string, dto: UpdateUserDto): Promise<{ message: string; admin: Admin }> {
    try {
      const editUser = await this.adminSchema.findOneAndUpdate({ email: email }, dto, {
        new: true,
      });
      if (!editUser) {
        throw new NotFoundException('user not found');
      }
      return { message: 'succes edit', admin: editUser };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error.message);

      throw new InternalServerErrorException('server error');
    }
  }
  async deleteUser(email: string): Promise<{ message: string }> {
    try {
      const deleteUser = await this.adminSchema.findOneAndDelete({ email: email });
      if (!deleteUser) {
        throw new NotFoundException('user not found');
      }
      return { message: 'succes delete' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
}
