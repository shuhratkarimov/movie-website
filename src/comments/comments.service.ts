import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(dto: CreateCommentDto) {
    const comment = this.commentRepository.create(dto);
    return this.commentRepository.save(comment);
  }

  findByMovie(movieId: string) {
    return this.commentRepository.find({
      where: { movieId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, userId: string, dto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new ForbiddenException('You can only edit your comment');

    Object.assign(comment, dto);
    return this.commentRepository.save(comment);
  }

  async remove(id: string, userId: string) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) throw new NotFoundException('Comment not found');
    if (comment.userId !== userId) throw new ForbiddenException('You can only delete your comment');

    await this.commentRepository.remove(comment);
    return { message: 'Comment deleted' };
  }
}
