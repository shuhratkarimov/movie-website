import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsNumber,
    IsOptional,
    IsUrl,
    Min,
    Max,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  enum Genres {
    ACTION = 'Action',
    DRAMA = 'Drama',
  }
  
  export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @Type(() => Number)
    @IsNumber()
    @Min(1800)
    releaseYear: number;
  
    @IsEnum(Genres)
    genre: Genres;
  
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(10)
    rating: number;
  
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    duration: number; // in minutes
  
    @IsOptional()
    @IsUrl()
    posterUrl?: string;
  
    @IsOptional()
    @IsUrl()
    trailerUrl?: string;
  }
  