import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(createMovieDto: CreateMovieDto): Promise<import("./entities/movie.entity").MoviesEntity>;
    findAll(): Promise<import("./entities/movie.entity").MoviesEntity[]>;
    findOne(id: string): Promise<import("./entities/movie.entity").MoviesEntity>;
    update(id: string, updateMovieDto: UpdateMovieDto): Promise<import("./entities/movie.entity").MoviesEntity>;
    remove(id: string): Promise<string>;
}
