import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(dto => Promise.resolve({ message: 'Successfully registered', id: '1' })),
    verify: jest.fn((code, id) => Promise.resolve({ message: 'Successfully verified' })),
    login: jest.fn((dto, res) => res.status(200).json({ message: 'Login successful', token: 'token' })),
    resendCode: jest.fn(email => Promise.resolve({ message: 'Verification code resent successfully', id: '1' })),
    forgotPassword: jest.fn(email => Promise.resolve({ message: 'Reset code sent to email' })),
    resetPassword: jest.fn((email, code, newPassword) => Promise.resolve({ message: 'Password reset successfully' })),
    logout: jest.fn(res => res.json({ message: 'Successfully logout' })),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should register a user', async () => {
    const dto: CreateAuthDto = { fullName: 'Test User', email: 'test@example.com', password: 'password' };
    expect(await authController.register(dto)).toEqual({ message: 'Successfully registered', id: '1' });
    expect(mockAuthService.register).toHaveBeenCalledWith(dto);
  });

  it('should verify a user', async () => {
    expect(await authController.verify('1', 123456)).toEqual({ message: 'Successfully verified' });
    expect(mockAuthService.verify).toHaveBeenCalledWith(123456, '1');
  });

  it('should login a user', async () => {
    const dto: UpdateAuthDto = { email: 'test@example.com', password: 'password' };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await authController.login(dto, res as Response);
    expect(mockAuthService.login).toHaveBeenCalledWith(dto, res);
  });

  it('should resend verification code', async () => {
    expect(await authController.resendCode('test@example.com')).toEqual({ message: 'Verification code resent successfully', id: '1' });
    expect(mockAuthService.resendCode).toHaveBeenCalledWith('test@example.com');
  });

  it('should send forgot password code', async () => {
    expect(await authController.forgot('test@example.com')).toEqual({ message: 'Reset code sent to email' });
    expect(mockAuthService.forgotPassword).toHaveBeenCalledWith('test@example.com');
  });

  it('should reset password', async () => {
    expect(await authController.resetPassword('test@example.com', 123456, 'newPassword')).toEqual({ message: 'Password reset successfully' });
    expect(mockAuthService.resetPassword).toHaveBeenCalledWith('test@example.com', 123456, 'newPassword');
  });

  it('should logout a user', async () => {
    const res: Partial<Response> = {
      json: jest.fn(),
    };
    await authController.logout(res as Response);
    expect(mockAuthService.logout).toHaveBeenCalledWith(res);
  });
});
