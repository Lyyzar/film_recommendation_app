import React, { useState } from "react";
import { displayPopularMovies, searchMovies } from "./api";
import { notification } from "antd";
import { Movie, MovieResponse, Movies } from "./interfaces";

function App() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<MovieResponse>({
    page: 1,
    results: [],
  });
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const handleClick = async () => {
    try {
      setPopularMovies(await displayPopularMovies());
      notification.success({
        message: "Successfull query",
        description: "The popular movies are displayed!",
      });
    } catch (error) {
      console.log(error, "error");
      notification.error({
        message: "Error",
        description: "Your playertag is incorrect!",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setMovies(await searchMovies(query));
      notification.success({
        message: "Successfull query",
        description: "The popular movies are displayed!",
      });
    } catch (error) {
      console.log(error, "error");
      notification.error({
        message: "Error",
        description: "Your playertag is incorrect!",
      });
    }
  };

  return (
    <div className="bg-gray-400 flex flex-col justify-center items-center">
      <div className="text-center min-h-screen w-full">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          Welcome to My TailwindCSS Page!
        </h1>
        <p className="text-gray-700 text-lg">
          This is a default homepage styled with Tailwind CSS in a React app.
        </p>
        <button
          onClick={handleClick}
          className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
        >
          Get Started
        </button>

        {popularMovies.length > 0 && (
          <div className="relative w-full mt-3 overflow-hidden">
            <div className="flex w-max h-96 gap-2 animate-scroll">
              {popularMovies.concat(popularMovies).map((movie, index) => {
                let imgSrc =
                  "https://image.tmdb.org/t/p/w500" + movie.posterUrl;
                return (
                  <div
                    className="flex-shrink-0 w-36 h-full flex justify-center items-center"
                    key={index}
                  >
                    <img
                      src={imgSrc}
                      className="max-h-full object-contain transform transition duration-300 ease-out hover:scale-105"
                      alt="poster"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </form>
        {movies.results?.length > 0 && (
          <div>
            <h2>Results:</h2>
            <ul>
              {movies.results.map((movie, index) => (
                <li key={index}>
                  <h3 className="text-3xl font-bold">{movie.title}</h3>
                  <p>{movie.overview}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
