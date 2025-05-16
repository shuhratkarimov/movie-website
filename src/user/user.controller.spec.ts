import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userService: {
    findOne: jest.Mock;
    update: jest.Mock;
  };

  const mockRequest = {
    user: { id: 1 },
  } as any;

  beforeEach(async () => {
    userService = {
      findOne: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return the user from service', async () => {
      const mockUser = { id: 1, fullName: 'John Doe' };
      userService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne(mockRequest);
      expect(result).toEqual(mockUser);
      expect(userService.findOne).toHaveBeenCalledWith(mockRequest);
    });

    it('should throw NotFoundException if user not found', async () => {
      userService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(mockRequest)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      const updateDto: UpdateUserDto = {
        fullName: 'Updated Name',
        old_password: 'old123',
        new_password: 'new123',
      };

      const updatedUser = {
        id: 1,
        fullName: 'Updated Name',
        password: 'hashed_new_pass',
      };

      userService.update.mockResolvedValue(updatedUser);

      const result = await controller.update(mockRequest, updateDto);
      expect(result).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledWith(mockRequest, updateDto);
    });

    it('should throw NotFoundException if user not found or update fails', async () => {
      userService.update.mockRejectedValue(new NotFoundException());

      await expect(
        controller.update(mockRequest, {} as UpdateUserDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
