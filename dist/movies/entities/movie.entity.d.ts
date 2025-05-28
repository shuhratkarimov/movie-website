declare enum Genres {
    ACTION = "Action",
    DRAMA = "Drama"
}
export declare class MoviesEntity {
    id: string;
    title: string;
    description: string;
    releaseYear: number;
    genre: Genres;
    rating: number;
    duration: number;
    posterUrl: string;
    trailerUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
