import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
export declare class MoviesService {
    private readonly movieRepo;
    constructor(movieRepo: Repository<MoviesEntity>);
    create(createMovieDto: CreateMovieDto): Promise<MoviesEntity>;
    findAll(): Promise<MoviesEntity[]>;
    findOne(movieId: string): Promise<MoviesEntity>;
    update(id: string, updateMovieDto: UpdateMovieDto): Promise<MoviesEntity>;
    remove(id: string): Promise<string>;
}
