import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  director: string;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsNumber()
  releaseYear: number;

  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @IsString()
  @IsOptional()
  trailerUrl?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
