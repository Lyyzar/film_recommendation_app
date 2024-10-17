import { Dispatch, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { dividerClasses } from "@mui/material";
import useAuth from "../hooks/useAuth";
import {
  getAllMoviesFromFavourites,
  getAllMoviesFromWatchlist,
} from "../routes/api";
import { notification } from "antd";
import { Movie } from "../interfaces";

function Profile(props: {
  setMovie: React.Dispatch<React.SetStateAction<Movie>>;
  setDisplayComponent: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [toggleTabs, setToggleTabs] = useState<string>("Favourites");
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);

  const user = useAuth();

  const handleImageClick = (movie: Movie) => {
    console.log(movie);
    props.setMovie(movie);
    props.setDisplayComponent("FilmPage");
  };

  const fetchAllFavouriteMovies = async () => {
    if (!user) {
      props.setDisplayComponent("Home");
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
      props.setDisplayComponent("Home");
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
    <div className="min-h-screen">
      <div>
        <ul className="m-4">
          <li
            className="bg-black text-white rounded-lg w-fit m-2 p-2 hover:bg-gray-500 hover:cursor-pointer"
            onClick={() => {
              setToggleTabs("Favourites");
              fetchAllFavouriteMovies();
            }}
          >
            Favourites
          </li>
          <li
            className="bg-black text-white rounded-lg w-fit m-2 p-2 hover:bg-gray-500 hover:cursor-pointer"
            onClick={() => {
              setToggleTabs("Watchlist");
              fetchAllWatchlistMovies();
            }}
          >
            Watchlist
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        {toggleTabs == "Favourites" ? (
          <h1 className="text-center mb-5 font-bold text-2xl rounded-lg bg-white w-fit h-fit p-2">
            Your Favourite Movies
          </h1>
        ) : (
          <h1 className="text-center mb-5 font-bold text-2xl">
            Your Watchlist
          </h1>
        )}
      </div>

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
