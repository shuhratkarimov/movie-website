import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create.movie.dto';
import { Movie } from './movies.schema';
import { UpdateMovieDto } from './dto/update.movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('/createMovie')
  async createMovie(@Body() dto: CreateMovieDto): Promise<{ message: string; movie: Movie }> {
    return this.moviesService.createMovie(dto);
  }
  @Get('/getOne/:id')
  async getOneMovie(@Param('id') id: string): Promise<{ message: string; movie: Movie }> {
    return this.moviesService.getOneMovie(id);
  }
  @Get('/getAllMovie')
  async getAllMovie(): Promise<{ message: string; movie: Movie[] }> {
    return this.moviesService.getAllMovie();
  }
  @Put('/editMovie/:id')
  async editMovie(@Param('id') id: string, @Body() dto: UpdateMovieDto): Promise<{ message: string; movie: Movie }> {
    return this.moviesService.editMovie(id, dto);
  }
  @Delete('/delete/:id')
  async deleteMovie(@Param('id') id: string): Promise<{ message: string }> {
    return this.moviesService.deleteUser(id);
  }
}
