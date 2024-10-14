import { useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Movie } from "../interfaces";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { EyeIcon as EyeOutline } from "@heroicons/react/24/outline";
import { EyeIcon as EyeSolid } from "@heroicons/react/24/solid";

import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { notification } from "antd";
import { addFilmToFavourites, addFilmToWatchlist } from "../routes/api";

function FilmPage() {
  const location = useLocation();
  const movie: Movie = location.state?.movie;

  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isWatchlistHovered, setIsWatchlistHovered] = useState(false);

  const [toggleHeart, setToggleHeart] = useState(false);
  const [toggleWatchlist, setToggleWatchlist] = useState(false);

  const toolTipForHeart = !toggleHeart
    ? "Add to favourites"
    : "Remove from favourites";
  const toolTipForWatchlist = !toggleWatchlist
    ? "Add to watchlist"
    : "Remove from watchlist";

  if (!movie) {
    return <div>Movie not found or no movie data available.</div>;
  }

  let imgSrc = "https://image.tmdb.org/t/p/w500" + movie.posterUrl;

  const handleHeartIconClick = async () => {
    try {
      await addFilmToFavourites(movie);
      notification.success({
        message: "Successfull query",
        description: "The popular movies are displayed!",
      });
    } catch (error) {
      console.log(error, "error");
      notification.error({
        message: "Error",
        description: "Something went wrong!",
      });
    }
  };

  const handleWatchlistIconClick = async () => {
    try {
      await addFilmToWatchlist(movie);
      notification.success({
        message: "Successfull query",
        description: "The popular movies are displayed!",
      });
    } catch (error) {
      console.log(error, "error");
      notification.error({
        message: "Error",
        description: "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-400 text-black">
      <NavBar />
      <div id="main" className="m-10 min-h-full">
        <div id="card" className="flex flex-row bg-gray-600 rounded-lg">
          <div id="card-left">
            <img src={imgSrc} alt="poster" className="rounded-l-lg" />
          </div>

          <div id="card-right" className="flex flex-col">
            {/* Card Header */}
            <div
              id="card-header"
              className="p-5 bg-white text-3xl font-bold rounded-tr-lg"
            >
              <div
                id="first-row"
                className="flex flex-row justify-between rounded-tr-lg"
              >
                <div id="title" className="">
                  {movie.title}
                </div>
                <div id="rating">{movie.rating}</div>
              </div>
              <div id="second-row" className="text-lg italic mt-2">
                {movie.genre}
              </div>
            </div>

            {/* Card Main */}
            <div id="card-main" className="flex-grow p-5">
              <div className="mt-10 text-xl text-white">{movie.overview}</div>
            </div>

            {/* Card Footer */}
            <div id="card-footer" className="p-5">
              <div id="footer" className="flex justify-end">
                <div
                  id="icons"
                  className="flex flex-row w-fit h-fit rounded-xl p-2 bg-white"
                >
                  <div
                    id="heartIcon"
                    onMouseEnter={() => setIsHeartHovered(true)}
                    onMouseLeave={() => setIsHeartHovered(false)}
                    onClick={() => setToggleHeart(!toggleHeart)}
                    className="mx-2"
                  >
                    {toggleHeart || isHeartHovered ? (
                      <Tooltip title={toolTipForHeart} placement="top">
                        <HeartSolid
                          onClick={handleHeartIconClick}
                          className="size-10"
                        />
                      </Tooltip>
                    ) : (
                      <HeartOutline className="size-10" />
                    )}
                  </div>
                  <div
                    id="eyeIcon"
                    onMouseEnter={() => setIsWatchlistHovered(true)}
                    onMouseLeave={() => setIsWatchlistHovered(false)}
                    onClick={() => setToggleWatchlist(!toggleWatchlist)}
                    className="mx-2"
                  >
                    {toggleWatchlist || isWatchlistHovered ? (
                      <Tooltip title={toolTipForWatchlist} placement="top">
                        <EyeSolid
                          onClick={handleWatchlistIconClick}
                          className="size-10"
                        />
                      </Tooltip>
                    ) : (
                      <EyeOutline className="size-10" />
                    )}
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmPage;
