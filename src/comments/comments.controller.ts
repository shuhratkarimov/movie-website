import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.service.create(dto);
  }

  @Get(':movieId')
  findByMovie(@Param('movieId') movieId: string) {
    return this.service.findByMovie(movieId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('userId') userId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.service.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body('userId') userId: string) {
    return this.service.remove(id, userId);
  }
}
