"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = require("./entities/movie.entity");
const typeorm_2 = require("typeorm");
let MoviesService = class MoviesService {
    movieRepo;
    constructor(movieRepo) {
        this.movieRepo = movieRepo;
    }
    async create(createMovieDto) {
        const newMovie = await this.movieRepo.create(createMovieDto);
        if (!newMovie) {
            throw new common_1.BadRequestException('Movie not created');
        }
        await this.movieRepo.save(newMovie);
        return newMovie;
    }
    async findAll() {
        return await this.movieRepo.find();
    }
    async findOne(movieId) {
        const foundMovie = await this.movieRepo.findOneBy({ id: movieId });
        if (!foundMovie) {
            throw new common_1.NotFoundException('Movie not found');
        }
        return foundMovie;
    }
    async update(id, updateMovieDto) {
        const updateResult = await this.movieRepo.update({ id }, updateMovieDto);
        if (updateResult.affected === 0) {
            throw new common_1.NotFoundException('Movie not found');
        }
        const updatedMovie = await this.movieRepo.findOne({ where: { id } });
        if (!updatedMovie) {
            throw new common_1.NotFoundException('Movie not found after update');
        }
        return updatedMovie;
    }
    async remove(id) {
        const deleteMovie = await this.movieRepo.delete(id);
        if (deleteMovie.affected === 0) {
            throw new common_1.NotFoundException('Movie not found');
        }
        return `Movie with id: ${id} deleted successfully`;
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.MoviesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesService);
//# sourceMappingURL=movies.service.js.map