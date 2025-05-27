import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema({ timestamps: true })
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true, unique: true })
  genre: string;

  @Prop({required:true})
  releaseYear:number

  @Prop({required:true})
  trailerUrl:string

  @Prop({required:true})
  imageUrl:string
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
