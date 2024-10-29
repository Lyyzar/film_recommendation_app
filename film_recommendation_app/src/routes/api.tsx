import axios from "axios";
import { Movie, MovieSearchResponse, transformToMovie } from "../interfaces";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const displayPopularMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get("/fetch-movies");
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const searchMovies = async (keyword: string): Promise<Movie[]> => {
  try {
    const response = await api.get(`/search?keyword=${keyword}`);
    const moviesSearchResults: MovieSearchResponse = response.data;
    const transformedMovies: Movie[] =
      moviesSearchResults.results.map(transformToMovie);
    return transformedMovies;
  } catch (error) {
    console.log("Error", error);
    throw new Error("An unexpected error occurred");
  }
};

export const isInWatchlist = async (
  userId: string,
  movie: Movie
): Promise<boolean> => {
  try {
    const response = await api.post("/isInWatchlist", { userId, movie });
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const isInFavourites = async (
  userId: string,
  movie: Movie
): Promise<boolean> => {
  try {
    const response = await api.post("/isInFavourites", { userId, movie });
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const saveMovieToWatchlist = async (
  userId: string,
  movie: Movie
): Promise<void> => {
  try {
    console.log("Mov" + movie);

    await api.post("/saveFilmToWatchlist", { userId, movie });
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const deleteMovieFromWatchlist = async (
  userId: string,
  movie: Movie
): Promise<void> => {
  try {
    await api.post("/deleteFilmFromWatchlist", { userId, movie });
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const getAllMoviesFromWatchlist = async (
  userId: string
): Promise<Movie[]> => {
  try {
    const response = await api.post("/getAllFilmsFromWatchlist", userId);
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const saveMovieToFavourites = async (
  userId: string,
  movie: Movie
): Promise<void> => {
  try {
    await api.post("/saveFilmToFavourites", { userId, movie });
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const deleteMovieFromFavourites = async (
  userId: string,
  movie: Movie
): Promise<void> => {
  try {
    api.post("/deleteMovieFromFavourites", { userId, movie });
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const getAllMoviesFromFavourites = async (
  userId: string
): Promise<Movie[]> => {
  try {
    const response = await api.post("/getAllFilmsFromFavourites", userId);
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};
