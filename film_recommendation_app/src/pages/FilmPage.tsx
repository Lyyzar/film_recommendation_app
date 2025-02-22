import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Movie } from "../interfaces";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { EyeIcon as EyeOutline } from "@heroicons/react/24/outline";
import { EyeIcon as EyeSolid } from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { notification } from "antd";
import useAuth from "../hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import {
  deleteMovieFromFavourites,
  deleteMovieFromWatchlist,
  isInFavourites,
  isInWatchlist,
  saveMovieToFavourites,
  saveMovieToWatchlist,
} from "../routes/api";

function FilmPage() {
  const location = useLocation();
  const movie: Movie = location.state?.movie;
  const user = useAuth();

  const navigate = useNavigate();

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

  const handleMissingToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("No token found. Logging out.");
          navigate("/signin");
        })
        .catch((error) => {
          console.error("Error during logout: ", error);
        });
    }
  };

  useEffect(() => {
    if (user && movie) {
      isHeartClicked();
      isWatchlistClicked();
    }
  }, [user, movie]);

  if (!movie) {
    return <div>Movie not found or no movie data available.</div>;
  }

  let imgSrc = "https://image.tmdb.org/t/p/w500" + movie.posterUrl;

  const isHeartClicked = async () => {
    try {
      if (!user) {
        navigate("/");
      } else {
        handleMissingToken();
        const response = await isInFavourites(user.uid, movie);
        if (response) {
          setToggleHeart(true);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const isWatchlistClicked = async () => {
    try {
      if (!user) {
        navigate("/");
      } else {
        handleMissingToken();
        const response = await isInWatchlist(user.uid, movie);
        if (response) {
          setToggleWatchlist(true);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleHeartIconClick = async () => {
    try {
      if (!user) {
        navigate("/");
      } else {
        handleMissingToken();
        if (!toggleHeart) {
          await saveMovieToFavourites(user.uid, movie);
          notification.success({
            message: "Added to favorites",
            description:
              "You have succesfully added this film to your favourites!",
          });
          console.log(`Film ${movie.title} liked by user ${user.uid}`);
        } else {
          await deleteMovieFromFavourites(user.uid, movie);
          notification.success({
            message: `${movie.title} deleted from favorites`,
            description: `You have succesfully deleted ${movie.title} from your favourites!`,
          });
          console.log(`Film ${movie.title} liked by user ${user.uid}`);
        }
      }
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
      if (!user) {
        navigate("/");
      } else {
        handleMissingToken();
        if (!toggleWatchlist) {
          await saveMovieToWatchlist(user.uid, movie);
          notification.success({
            message: "Added to Watchlist",
            description: `You have succesfully added ${movie.title} to your watchlist!`,
          });
          console.log(`Film ${movie.title} liked by user ${user.uid}`);
        } else {
          await deleteMovieFromWatchlist(user.uid, movie);
          notification.success({
            message: `${movie.title} deleted from your watchlist`,
            description: `You have succesfully deleted ${movie.title} from your watchlist!`,
          });
          console.log(`Film ${movie.title} liked by user ${user.uid}`);
        }
      }
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
        <div
          id="card"
          className="flex flex-row min-h-full bg-gray-600 rounded-lg"
        >
          <div id="card-left">
            <img
              src={imgSrc}
              alt="poster"
              className="rounded-l-lg min-h-full w-auto"
            />
          </div>

          <div id="card-right" className="flex flex-col w-full">
            {/* Card Header */}
            <div
              id="card-header"
              className="p-5 bg-white text-3xl font-bold rounded-tr-lg"
            >
              <div
                id="first-row"
                className="flex flex-row justify-between rounded-tr-lg"
              >
                <div id="title">{movie.title}</div>
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
