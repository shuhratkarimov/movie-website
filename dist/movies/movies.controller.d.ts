import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(createMovieDto: CreateMovieDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMovieDto: UpdateMovieDto): string;
    remove(id: string): string;
}
