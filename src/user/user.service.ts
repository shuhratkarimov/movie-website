import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async findOne(req: Request) {
    const { user } = req;

    const foundedUser = await this.authRepository.findOne({
      where: { id: user.id },
    });

    if (!foundedUser) {
      throw new NotFoundException('User not found');
    }

    return foundedUser;
  }

  async update(req: Request, updateUserDto: UpdateUserDto) {
    const { fullName, old_password, new_password } = updateUserDto;
    const { user } = req;

    const foundedUser = await this.authRepository.findOne({
      where: { id: user.id },
    });

    if (!foundedUser) {
      throw new NotFoundException('User not found');
    }

    if (old_password && new_password) {
      const isMatch = await bcrypt.compare(old_password, foundedUser.password);

      if (!isMatch) {
        throw new NotFoundException('Old password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(new_password, 10);
      foundedUser.password = hashedPassword;
    }

    if (fullName) {
      foundedUser.fullName = fullName;
    }

    await this.authRepository.save(foundedUser);

    return { message: 'User updated successfully' };
  }
}
