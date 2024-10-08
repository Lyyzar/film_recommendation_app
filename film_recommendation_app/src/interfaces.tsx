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

export interface Movies {
  movies: Movie[];
}
