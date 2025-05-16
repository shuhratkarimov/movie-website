import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  // REGISTER
  async register(createAuthDto: CreateAuthDto) {
    const { fullName, email, password } = createAuthDto;

    const existingUser = await this.authRepository.findOne({ where: { email } });

    const verification_code = Math.floor(100000 + Math.random() * 900000);
    const hashedPassword = await bcrypt.hash(password, 10);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Movie App Verification Code',
      text: `Your verification code is: ${verification_code}`,
    };

    if (existingUser) {
      if (existingUser.isEmailVerified) {
        throw new BadRequestException('User already exists');
      }

      await transporter.sendMail(mailOptions);

      existingUser.fullName = fullName;
      existingUser.password = hashedPassword;
      existingUser.verification_code = verification_code;

      await this.authRepository.save(existingUser);

      setTimeout(async () => {
        await this.authRepository.update(existingUser.id, {
          verification_code: null,
        });
      }, 180000);

      return {
        message: 'Verification code resent. Please verify your email.',
        id: existingUser.id,
      };
    }

    await transporter.sendMail(mailOptions);

    const newUser = this.authRepository.create({
      fullName,
      email,
      password: hashedPassword,
      verification_code,
    });

    const savedUser = await this.authRepository.save(newUser);

    setTimeout(async () => {
      await this.authRepository.update(savedUser.id, {
        verification_code: null,
      });
    }, 180000);

    return {
      message: 'Successfully registered. Please verify email.',
      id: savedUser.id,
    };
  }

  // VERIFY
  async verify(code: number, id: string) {
    if (!code || code.toString().length !== 6) {
      throw new BadRequestException('Not a 6-digit number');
    }

    const user = await this.authRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found, please register');

    if (user.verification_code === null) {
      throw new BadRequestException('Your verification code is expired. Please resend.');
    }

    if (user.verification_code != code) {
      throw new BadRequestException('Your verification code is incorrect.');
    }

    await this.authRepository.update(id, {
      isEmailVerified: true,
      verification_code: null,
    });

    return { message: 'Successfully verified' };
  }

  // LOGIN
  async login(updateAuthDto: UpdateAuthDto, res: Response) {
    const { email, password } = updateAuthDto;

    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found, please register');

    if (!password) throw new BadRequestException('Password is required');

    if (!user.isEmailVerified) throw new BadRequestException('Your account is not verified');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException('Incorrect password');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  }

  // RESEND VERIFICATION CODE
  async resendCode(email: string) {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');
    if (user.isEmailVerified) throw new BadRequestException('This account is already verified');

    const verification_code = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Movie App Verification Code (Resent)',
      text: `Your new verification code is: ${verification_code}`,
    };

    await transporter.sendMail(mailOptions);

    user.verification_code = verification_code;
    await this.authRepository.save(user);

    setTimeout(async () => {
      await this.authRepository.update(user.id, {
        verification_code: null,
      });
    }, 180000);

    return {
      message: 'Verification code resent successfully',
      id: user.id,
    };
  }

  // ✅ FORGOT PASSWORD
  async forgotPassword(email: string) {
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    const resetCode = Math.floor(100000 + Math.random() * 900000);
    user.verification_code = resetCode;
    await this.authRepository.save(user);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Your Password',
      text: `Your password reset code is: ${resetCode}`,
    });

    setTimeout(async () => {
      await this.authRepository.update(user.id, {
        verification_code: null,
      });
    }, 180000);

    return { message: 'Reset code sent to email' };
  }

  async resetPassword(email: string, code: number, newPassword: string) {
    const user = await this.authRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    if (!user.verification_code || user.verification_code !== code) {
      throw new BadRequestException('Invalid or expired code');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.authRepository.update(user.id, {
      password: hashed,
      verification_code: null,
    });

    return { message: 'Password reset successfully' };
  }

  // LOGOUT
  async logout(res: Response) {
    res.clearCookie('accessToken');
    return res.json({ message: 'Successfully logout' });
  }
}
