import { useState } from "react";
import NavBar from "../components/NavBar";
import { dividerClasses } from "@mui/material";
import useAuth from "../hooks/useAuth";
import {
  getAllMoviesFromFavourites,
  getAllMoviesFromWatchlist,
} from "../routes/api";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { Movie } from "../interfaces";

function Profile() {
  const [toggleTabs, setToggleTabs] = useState<string>("Favourites");
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

  const user = useAuth();
  const navigate = useNavigate();

  const handleImageClick = (movie: Movie) => {
    console.log(movie);
    navigate(`/film/${movie.title}`, { state: { movie } });
  };

  const fetchAllFavouriteMovies = async () => {
    if (!user) {
      navigate("/");
    } else {
      const favouriteMovies = await getAllMoviesFromFavourites(user.uid);
      console.log("FAVOURITES: ", favouriteMovies);
      setFavouriteMovies(favouriteMovies);
      notification.success({
        message: "Successfull query!",
        description: "Queried all the favourite movies!",
      });
    }
  };

  const fetchAllWatchlistMovies = async () => {
    if (!user) {
      navigate("/");
    } else {
      const watchlistMovies = await getAllMoviesFromWatchlist(user.uid);
      console.log("WATCHLIST: ", watchlistMovies);
      setWatchlistMovies(watchlistMovies);
      notification.success({
        message: "Successfull query!",
        description: "Queried all the favourite movies!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black">
      <NavBar />
      <div>
        <ul className="m-4">
          <li
            className="bg-gray-400 rounded-lg w-fit m-2 p-2 hover:bg-gray-500 hover:cursor-pointer"
            onClick={() => {
              setToggleTabs("Favourites");
              fetchAllFavouriteMovies();
            }}
          >
            Favourites
          </li>
          <li
            className="bg-gray-400 rounded-lg w-fit m-2 p-2 hover:bg-gray-500 hover:cursor-pointer"
            onClick={() => {
              setToggleTabs("Watchlist");
              fetchAllWatchlistMovies();
            }}
          >
            Watchlist
          </li>
        </ul>
      </div>
      <h1>Films:</h1>
      <div>
        {toggleTabs === "Favourites" ? (
          <div>
            <ul className="mx-10 flex flex-col items-center">
              {favouriteMovies.map((movie, index) => {
                let imgSrc =
                  "https://image.tmdb.org/t/p/w500" + movie.posterUrl;
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
        ) : null}

        {toggleTabs === "Watchlist" ? (
          <ul className="mx-10 flex flex-col items-center">
            {watchlistMovies.map((movie, index) => {
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
        ) : null}
      </div>
    </div>
  );
}
export default Profile;
