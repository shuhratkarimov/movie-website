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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesEntity = void 0;
const typeorm_1 = require("typeorm");
var Genres;
(function (Genres) {
    Genres["ACTION"] = "Action";
    Genres["DRAMA"] = "Drama";
})(Genres || (Genres = {}));
let MoviesEntity = class MoviesEntity {
    id;
    title;
    description;
    releaseYear;
    genre;
    rating;
    duration;
    posterUrl;
    trailerUrl;
    createdAt;
    updatedAt;
};
exports.MoviesEntity = MoviesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MoviesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], MoviesEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], MoviesEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], MoviesEntity.prototype, "releaseYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Genres, nullable: false }),
    __metadata("design:type", String)
], MoviesEntity.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], MoviesEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], MoviesEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MoviesEntity.prototype, "posterUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MoviesEntity.prototype, "trailerUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MoviesEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MoviesEntity.prototype, "updatedAt", void 0);
exports.MoviesEntity = MoviesEntity = __decorate([
    (0, typeorm_1.Entity)()
], MoviesEntity);
//# sourceMappingURL=movie.entity.js.map