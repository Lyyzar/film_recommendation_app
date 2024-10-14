export interface Movie {
  id: number;
  title: string;
  genre: string;
  overview: string;
  releaseDate: string;
  rating: number;
  posterUrl: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
}

export interface MovieSearchResponse {
  page: number;
  results: MovieSearch[];
}

export interface MovieSearch {
  id: number;
  title: string;
  genre: string;
  overview: string;
  releaseDate: string;
  rating: number;
  poster_path: string;
}

export interface Movies {
  movies: Movie[];
}

export const transformToMovie = (movieSearch: MovieSearch): Movie => {
  return {
    id: movieSearch.id,
    title: movieSearch.title,
    genre: movieSearch.genre,
    overview: movieSearch.overview,
    releaseDate: movieSearch.releaseDate,
    rating: movieSearch.rating,
    posterUrl: movieSearch.poster_path,
  };
};
