import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(MoviesEntity) private readonly movieRepo: Repository<MoviesEntity>){}
 async create(createMovieDto: CreateMovieDto):Promise<MoviesEntity> {
    const newMovie = await this.movieRepo.create(createMovieDto)
    if(!newMovie){
      throw new BadRequestException('Movie not created')
    }
    await this.movieRepo.save(newMovie);
    return newMovie;
  }

 async findAll():Promise<MoviesEntity[]> {
    return await this.movieRepo.find();
  }

 async findOne(movieId: string):Promise<MoviesEntity> {
   const foundMovie = await this.movieRepo.findOneBy({id: movieId})
   if(!foundMovie){
    throw new NotFoundException('Movie not found')
   }
   return foundMovie
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<MoviesEntity> {
    const updateResult = await this.movieRepo.update({ id }, updateMovieDto);
  
    if (updateResult.affected === 0) {
      throw new NotFoundException('Movie not found');
    }
  
    const updatedMovie = await this.movieRepo.findOne({ where: { id } });
    if (!updatedMovie) {
      throw new NotFoundException('Movie not found after update');
    }
  
    return updatedMovie;
  }
  

 async remove(id: string):Promise<string> {
    const deleteMovie = await this.movieRepo.delete(id);
    if(deleteMovie.affected === 0){
      throw new NotFoundException('Movie not found');
    }
    return `Movie with id: ${id} deleted successfully`
  }
}
