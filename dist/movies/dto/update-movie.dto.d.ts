declare enum Genres {
    ACTION = "Action",
    DRAMA = "Drama"
}
export declare class UpdateMovieDto {
    title?: string;
    description?: string;
    releaseYear?: number;
    genre?: Genres;
    rating?: number;
    duration?: number;
    posterUrl?: string;
    trailerUrl?: string;
}
export {};
