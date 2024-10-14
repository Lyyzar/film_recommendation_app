import axios from "axios";
import {
  Movie,
  MovieResponse,
  MovieSearch,
  MovieSearchResponse,
  transformToMovie,
} from "../interfaces";

const api = axios.create({
  baseURL: "http://localhost:8080", // Set the base URL
});

export const displayPopularMovies = async (): Promise<Movie[]> => {
  try {
    console.log("DisplayPopularMovies");
    const response = await api.get("/fetch-movies");
    console.log("Received data from the API", response.data);
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const searchMovies = async (keyword: string): Promise<Movie[]> => {
  try {
    console.log("SearchMovies", keyword);
    const response = await api.get(`/search?keyword=${keyword}`);
    console.log("Received data from the API", response.data);
    const moviesSearchResults: MovieSearchResponse = response.data;

    const transformedMovies: Movie[] =
      moviesSearchResults.results.map(transformToMovie);
    console.log("Transformed movies", transformedMovies);
    return transformedMovies;
  } catch (error) {
    console.log("Error", error);
    throw new Error("An unexpected error occurred");
  }
};

export const addFilmToFavourites = async (movie: Movie): Promise<boolean> => {
  try {
    console.log("AddFilmToFavourites", movie);
    await api.post("/add-to-favourites", movie);
    return true;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const addFilmToWatchlist = async (movie: Movie): Promise<boolean> => {
  try {
    console.log("AddFilmToWatchlist", movie);
    await api.post("/add-to-favourites", movie);
    return true;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};
