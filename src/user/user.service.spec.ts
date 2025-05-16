import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt'); // bcrypt ni mock qilamiz

const mockUser = {
  id: 1,
  fullName: 'John Doe',
  password: 'hashed_password',
};

const mockRequest = {
  user: { id: mockUser.id },
} as any;

describe('UserService', () => {
  let service: UserService;
  let mockAuthRepository: {
    findOne: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(async () => {
    mockAuthRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Auth),
          useValue: mockAuthRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return the user if found', async () => {
      mockAuthRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne(mockRequest);
      expect(result).toEqual(mockUser);
      expect(mockAuthRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockAuthRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update fullName and password if provided correctly', async () => {
      const updateDto = {
        fullName: 'New Name',
        old_password: 'old_pass',
        new_password: 'new_pass',
      };

      mockAuthRepository.findOne.mockResolvedValue({ ...mockUser });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new_hashed_pass');

      await service.update(mockRequest, updateDto);

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'old_pass',
        mockUser.password,
      );
      expect(bcrypt.hash).toHaveBeenCalledWith('new_pass', 10);
      expect(mockAuthRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        fullName: 'New Name',
        password: 'new_hashed_pass',
      });
    });

    it('should throw if old password is incorrect', async () => {
      const updateDto = {
        fullName: 'New Name',
        old_password: 'wrong_pass',
        new_password: 'new_pass',
      };

      mockAuthRepository.findOne.mockResolvedValue({ ...mockUser });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.update(mockRequest, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should only update fullName if password fields not provided', async () => {
      const updateDto = {
        fullName: 'Only Name',
      };

      mockAuthRepository.findOne.mockResolvedValue({ ...mockUser });

      await service.update(mockRequest, updateDto as any);

      expect(mockAuthRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        fullName: 'Only Name',
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockAuthRepository.findOne.mockResolvedValue(null);

      await expect(service.update(mockRequest, {} as any)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
