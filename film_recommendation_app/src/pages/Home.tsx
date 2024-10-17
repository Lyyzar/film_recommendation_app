import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { Movie } from "../interfaces";
import { displayPopularMovies, searchMovies } from "../routes/api";

function Home(props: {
  setDisplayComponent: React.Dispatch<React.SetStateAction<string>>;
  setMovie: React.Dispatch<React.SetStateAction<Movie>>;
}) {
  const [query, setQuery] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    popularMoviesSetup();
  }, []);

  const popularMoviesSetup = async () => {
    try {
      setPopularMovies(await displayPopularMovies());
    } catch (error) {
      console.log(error, "error");
      notification.error({
        message: "Error",
        description: "Something went wrong!",
      });
    }
  };

  const handleImageClick = (movie: Movie) => {
    console.log(movie);
    props.setMovie(movie);
    props.setDisplayComponent("FilmPage");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSearchedMovies(await searchMovies(query));
      console.log("Results:" + searchedMovies);
      notification.success({
        message: "Successfull query",
        description: "The searched movies are displayed!",
      });
    } catch (error) {
      console.log(error, "error");
      notification.error({
        message: "Error",
        description: "There was an error in the search!",
      });
    }
  };

  return (
    <div className="text-center min-h-screen w-full">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Welcome to My Film App Page!
      </h1>
      <p className="text-gray-700 text-lg">
        This is a default homepage styled with Tailwind CSS in a React app.
      </p>

      {popularMovies.length > 0 && (
        <div className="relative w-full mt-3 overflow-hidden">
          <div className="flex w-max h-96 gap-2 animate-scroll">
            {popularMovies.concat(popularMovies).map((movie, index) => {
              let imgSrc = "https://image.tmdb.org/t/p/w500" + movie.posterUrl;
              return (
                <div
                  className="flex-shrink-0 w-36 h-full flex justify-center items-center"
                  key={index}
                >
                  <img
                    src={imgSrc}
                    className="max-h-full object-contain transform transition duration-300 ease-out hover:scale-105 hover:cursor-pointer"
                    alt="poster"
                    onClick={() => handleImageClick(movie)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="text-right mr-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="rounded-lg p-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </form>
      </div>
      {searchedMovies?.length > 0 && (
        <div className="mt-4 flex justify-center">
          <ul className="mx-10 flex flex-col items-center">
            {searchedMovies.map((movie, index) => {
              let imgSrc = "https://image.tmdb.org/t/p/w500" + movie.posterUrl;
              return (
                <li
                  key={index}
                  className="max-h-52 h-52 w-1/2 overflow-hidden text-left mb-5 border border-red-800 bg-gray-600 transition transform hover:scale-105 ease-out rounded-lg hover:cursor-pointer"
                  onClick={() => handleImageClick(movie)}
                >
                  <div className="h-full flex">
                    <img
                      src={imgSrc}
                      alt="poster"
                      className="max-h-full w-auto object-contain"
                    />
                    <div className="flex flex-col p-2">
                      <div className="font-bold text-xl">{movie.title}</div>
                      <p>{movie.overview}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
