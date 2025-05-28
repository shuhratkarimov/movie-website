declare enum Genres {
    ACTION = "Action",
    DRAMA = "Drama"
}
export declare class CreateMovieDto {
    title: string;
    description: string;
    releaseYear: number;
    genre: Genres;
    rating: number;
    duration: number;
    posterUrl?: string;
    trailerUrl?: string;
}
export {};
