import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

describe('AuthService', () => {
  let service: AuthService;
  let authRepo: Partial<Record<keyof Repository<Auth>, jest.Mock>>;
  let jwtService: JwtService;

  beforeEach(async () => {
    authRepo = {
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const jwtMock = {
      sign: jest.fn().mockReturnValue('mocked_token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(Auth), useValue: authRepo },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ✅ Register
  it('should register user successfully', async () => {
    const dto: CreateAuthDto = {
      fullName: 'Test',
      email: 'test@example.com',
      password: 'password',
    };

    (authRepo.findOne as jest.Mock).mockResolvedValue(null);
    (authRepo.save as jest.Mock).mockResolvedValue({ id: 1 });

    const result = await service.register(dto);

    expect(authRepo.findOne).toHaveBeenCalledWith({
      where: { email: dto.email },
    });
    expect(authRepo.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  // ✅ Verify
  it('should verify user code', async () => {
    const mockUser = { id: 1, verify_code: 123456, is_verified: false };
    (authRepo.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.verify(123456, '1');

    expect(authRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(authRepo.update).toHaveBeenCalled();
    expect(result.message).toEqual('Successfully verified');
  });

  // ✅ Login
  it('should login user and return token', async () => {
    const dto: UpdateAuthDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const hashedPassword = await bcrypt.hash(dto.password!, 10);
    const user = {
      id: 1,
      email: dto.email,
      password: hashedPassword,
      is_verified: true,
    };

    (authRepo.findOne as jest.Mock).mockResolvedValue(user);

    const res = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await service.login(dto, res as any);

    expect(authRepo.findOne).toHaveBeenCalledWith({
      where: { email: dto.email },
    });
    expect(res.cookie).toHaveBeenCalledWith(
      'token',
      expect.any(String),
      expect.any(Object),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Login successful' }),
    );
  });

  // ✅ Resend Code
  it('should resend verification code', async () => {
    const user = { id: 1, email: 'test@example.com', is_verified: false };
    (authRepo.findOne as jest.Mock).mockResolvedValue(user);

    const result = await service.resendCode(user.email);

    expect(authRepo.findOne).toHaveBeenCalledWith({
      where: { email: user.email },
    });
    expect(result).toEqual({
      message: 'Verification code resent successfully',
      id: 1,
    });
  });

  // ✅ Forgot Password
  it('should send forgot password code', async () => {
    const user = { id: 1, email: 'test@example.com', is_verified: true };
    (authRepo.findOne as jest.Mock).mockResolvedValue(user);

    const result = await service.forgotPassword(user.email);

    expect(authRepo.findOne).toHaveBeenCalledWith({
      where: { email: user.email },
    });
    expect(result.message).toEqual('Reset code sent to email');
  });

  // ✅ Reset Password
  it('should reset password successfully', async () => {
    const code = 123456;
    const user = { id: 1, email: 'test@example.com', reset_code: code };
    (authRepo.findOne as jest.Mock).mockResolvedValue(user);

    const result = await service.resetPassword(user.email, code, 'newPassword');

    expect(authRepo.findOne).toHaveBeenCalledWith({
      where: { email: user.email },
    });
    expect(authRepo.update).toHaveBeenCalledWith(
      { id: user.id },
      expect.any(Object),
    );
    expect(result.message).toEqual('Password reset successfully');
  });

  // ✅ Logout
  it('should logout user and clear token cookie', async () => {
    const res = {
      clearCookie: jest.fn(),
      json: jest.fn(),
    };

    await service.logout(res as any);

    expect(res.clearCookie).toHaveBeenCalledWith('token');
    expect(res.json).toHaveBeenCalledWith({ message: 'Successfully logout' });
  });
});
