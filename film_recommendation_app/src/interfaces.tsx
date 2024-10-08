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
