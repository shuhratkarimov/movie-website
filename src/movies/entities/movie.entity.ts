import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Genres {
  ACTION = 'Action',
  DRAMA = 'Drama'
}

@Entity()
export class MoviesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  releaseYear: number;

  @Column({ type: 'enum', enum: Genres, nullable: false })
  genre: Genres;

  @Column('float')
  rating: number;

  @Column({ nullable: false })
  duration: number;

  @Column({ nullable: true })
  posterUrl: string;

  @Column({ nullable: true })
  trailerUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
