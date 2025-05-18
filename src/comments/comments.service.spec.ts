import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

describe('CommentsService', () => {
  let service: CommentsService;
  let repo: Repository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    repo = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});
