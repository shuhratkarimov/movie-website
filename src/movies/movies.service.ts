import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from './movies.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create.movie.dto';
import { Admin } from 'src/admin/admin.schema';
import { UpdateMovieDto } from './dto/update.movie.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieSchema: Model<Movie>) {}
  async createMovie( dto: CreateMovieDto): Promise<{ message: string; movie: Movie }> {
    try {
      const findMovie = await this.movieSchema.findOne({ title: dto.title });
      if (findMovie) {
        throw new ConflictException('movie already exists');
      }
      const createMovie = await this.movieSchema.create(dto);
      return { message: 'succes create', movie: createMovie };
    } catch (error) {
        console.log(error.message);
        
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async getAllMovie(): Promise<{ message: string; movie: Movie[] }> {
    try {
      const findMovie = await this.movieSchema.find();
      if (!findMovie) {
        throw new NotFoundException('user not found');
      }
      return { message: 'all users', movie: findMovie };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async getOneMovie(id: string): Promise<{ message: string; movie: Movie }> {
    try {
      const findMovie = await this.movieSchema.findOne({ _id: id });
      if (!findMovie) {
        throw new NotFoundException('user not found');
      }
      return { message: 'one user', movie: findMovie };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async editMovie(id: string, dto: UpdateMovieDto): Promise<{ message: string; movie: Movie }> {
    try {
      const editMovieAndUpdate = await this.movieSchema.findOneAndUpdate({ _id: id }, dto, {
        new: true,
      });
      if (!editMovieAndUpdate) {
        throw new NotFoundException('user not found');
      }
      return { message: 'succes edit', movie: editMovieAndUpdate };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(error.message);

      throw new InternalServerErrorException('server error');
    }
  }
  async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const findMovieAndDelete = await this.movieSchema.findOneAndDelete({ _id: id });
      if (!findMovieAndDelete) {
        throw new NotFoundException('user not found');
      }
      return { message: 'succes delete' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
}
