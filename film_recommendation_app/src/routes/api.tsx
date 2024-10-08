import axios from "axios";
import { Movie, MovieResponse, MovieSearchResponse } from "../interfaces";

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

export const searchMovies = async (
  keyword: string
): Promise<MovieSearchResponse> => {
  try {
    console.log("SearchMovies", keyword);
    const response = await api.get(`/search?keyword=${keyword}`);
    console.log("Received data from the API", response.data);
    return response.data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};
