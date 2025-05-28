import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

enum Genres {
    ACTION = 'Action',
    DRAMA = 'Drama',
  }

export class UpdateMovieDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;
  
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1800)
    releaseYear?: number;
  
    @IsOptional()
    @IsEnum(Genres)
    genre?: Genres;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(10)
    rating?: number;
  
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    duration?: number;
  
    @IsOptional()
    @IsUrl()
    posterUrl?: string;
  
    @IsOptional()
    @IsUrl()
    trailerUrl?: string;
  }
  